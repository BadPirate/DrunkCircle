/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { GQLInsertTrail, hares_insert_input } from '../../graph/types'

type TrailInfoVariables = {
  id: number | null;
  calculated_number: number | null;
  description: string | null;
  directions: string | null;
  draft: number | null;
  google_calendar: string | null;
  kennel: number;
  latitude: number | null;
  longitude: number | null;
  name: string;
  number: number | null;
  start: string;
  hares: hares_insert_input[];
}

const GQL_INSERT_TRAIL_WITH_ID = gql`
mutation GQLInsertTrail(
  $id: Int = null,
  $calculated_number: Int, 
  $description: String,
  $directions: String,
  $draft: Int,
  $google_calendar: String,
  $hares: [hares_insert_input!]!,
  $kennel: Int,
  $latitude: float8,
  $longitude: float8, 
  $name: String, 
  $number: Int, 
  $start: timestamptz) {
  insert_trails_one(object: {
    id: $id,
    calculated_number: $calculated_number, 
    description: $description,
    directions: $directions,
    draft: $draft, 
    google_calendar: $google_calendar, 
    hares: {data: $hares}, 
    kennel: $kennel, 
    latitude: $latitude, longitude: $longitude, 
    name: $name, 
    number: $number, 
    start: $start}) {
    id
  }
}`

const GQL_INSERT_TRAIL_DRAFT = gql`
mutation GQLInsertTrailDraft(
  $calculated_number: Int, 
  $description: String,
  $directions: String,
  $draft: Int,
  $google_calendar: String,
  $hares: [hares_insert_input!]!,
  $kennel: Int,
  $latitude: float8,
  $longitude: float8, 
  $name: String, 
  $number: Int, 
  $start: timestamptz) {
  insert_trails_one(object: {
    calculated_number: $calculated_number, 
    description: $description,
    directions: $directions,
    draft: $draft, 
    google_calendar: $google_calendar, 
    hares: {data: $hares}, 
    kennel: $kennel, 
    latitude: $latitude, longitude: $longitude, 
    name: $name, 
    number: $number, 
    start: $start}) {
    id
  }
}`

export async function insertTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  variables: TrailInfoVariables,
): Promise<number> {
  return sc.mutate<GQLInsertTrail>({
    mutation: variables.id ? GQL_INSERT_TRAIL_WITH_ID : GQL_INSERT_TRAIL_DRAFT,
    variables,
  }).then((r) => {
    if (!r.data?.insert_trails_one?.id) {
      throw Error(`Unable to insert: ${r.errors?.map((e) => e.message).join(', ')}`)
    }
    return r.data.insert_trails_one.id
  })
}
