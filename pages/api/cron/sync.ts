import { SyncDocument } from './../../../src/graph/types';
import { NextApiRequest, NextApiResponse } from "next";
import { ServerClient } from "../../../src/graph/hasura";
import { SyncQuery } from '../../../src/graph/types';
import { gcalData } from '../../../src/func/calendar/gcalData';
import { gcal } from '../../../src/api/google';
import { insertCalendar, updateCalendar } from '../../../src/func/calendar/updateGcal';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { calendar_v3 } from 'googleapis';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const sc = ServerClient()
    var result = await syncCalendars(sc);

    return res.status(200).json(result)
}

async function syncCalendars(sc: ApolloClient<NormalizedCacheObject>) {
    const kennels = await sc.query<SyncQuery>({
        query: SyncDocument
    }).then((r) => { return r.data.kennels.filter((k) => k.trails.length > 0); });

    var results = [];

    for (const kennel of kennels) {
        let result;
        ({ result } = await syncCalendar(kennel, sc));
        results.push(result);
    }

    return results;
}

async function syncCalendar(kennel: { __typename?: "kennels"; google_calendar?: string | null; short_name?: string | null; google_refresh?: string | null; google_token?: string | null; id: number; name?: string | null; trails: Array<{ __typename?: "trails"; calculated_number?: number | null; id: number; name: string; start: any; latitude?: any | null; longitude?: any | null; directions?: string | null; google_calendar?: string | null; description?: string | null; hares: Array<{ __typename?: "hares"; hasherInfo: { __typename?: "hashers"; name?: string | null; }; }>; }>; }, sc: ApolloClient<NormalizedCacheObject>) {
    var inserted = 0;
    var updated = 0;

    const cal = gcal(kennel.google_token!, kennel.google_refresh!);
    for (const trail of kennel.trails) {
        const { insert, update } = await updateTrailIfNeeded(trail, sc, cal, kennel);
        if (insert) {
            inserted += 1;
        }
        if (update) {
            updated += 1;
        }
    }
    const result = {
        kennel: kennel.short_name,
        inserted: inserted,
        updated: updated,
        trails: kennel.trails.length
    };
    return { result, inserted, updated };
}

async function updateTrailIfNeeded(trail: { __typename?: "trails"; calculated_number?: number | null; id: number; name: string; start: any; latitude?: any | null; longitude?: any | null; directions?: string | null; google_calendar?: string | null; description?: string | null; hares: Array<{ __typename?: "hares"; hasherInfo: { __typename?: "hashers"; name?: string | null; }; }>; }, sc: ApolloClient<NormalizedCacheObject>, cal: calendar_v3.Calendar, kennel: { __typename?: "kennels"; google_calendar?: string | null; short_name?: string | null; google_refresh?: string | null; google_token?: string | null; id: number; name?: string | null; trails: Array<{ __typename?: "trails"; calculated_number?: number | null; id: number; name: string; start: any; latitude?: any | null; longitude?: any | null; directions?: string | null; google_calendar?: string | null; description?: string | null; hares: Array<{ __typename?: "hares"; hasherInfo: { __typename?: "hashers"; name?: string | null; }; }>; }>; }) {
    console.log(`Checking ${trail.name}...`);

    if (!trail.google_calendar) {
        console.log(`Inserting ${trail.name}...`);
        insertCalendar(sc, cal, kennel, trail);
        return { insert: true }
    }

    // Validate what's there
    let expected = gcalData(kennel, trail);
    let current = await cal.events.get({
        calendarId: kennel.google_calendar!,
        eventId: trail.google_calendar
    }).then((r) => { return r.data; });
    let update = false;
    if (expected.requestBody.summary !== current.summary) {
        console.log(`Summary: ${current.summary} -> ${expected.requestBody.summary}`);
        update = true;
    }
    const expectedStart = new Date(expected.requestBody.start.dateTime).getTime() / 1000;
    const currentStart = new Date(current.start!.dateTime!).getTime() / 1000;
    if (expectedStart !== currentStart) {
        console.log(`Start: ${expectedStart} -> ${currentStart}`, current);
        update = true;
    }
    if (expected.requestBody.description !== current.description) {
        console.log(`Description: ${current.description} -> ${expected.requestBody.description}`);
        update = true;
    }
    if (update) {
        console.log(`Updating ${trail.name}...`);
        updateCalendar(sc, cal, kennel, trail);
    }

    return { update };
}

