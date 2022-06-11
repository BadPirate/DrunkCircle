/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetRefreshToken
// ====================================================

export interface GQLGetRefreshToken_kennels {
  __typename: "kennels";
  google_refresh: string | null;
}

export interface GQLGetRefreshToken {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLGetRefreshToken_kennels[];
}

export interface GQLGetRefreshTokenVariables {
  accessToken?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUpdateAccessToken
// ====================================================

export interface GQLUpdateAccessToken_update_kennels {
  __typename: "kennels_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface GQLUpdateAccessToken {
  /**
   * update data of the table: "kennels"
   */
  update_kennels: GQLUpdateAccessToken_update_kennels | null;
}

export interface GQLUpdateAccessTokenVariables {
  accessToken?: string | null;
  urt?: string | null;
  uat?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUpdateSelfDraft
// ====================================================

export interface GQLUpdateSelfDraft_update_trails_by_pk {
  __typename: "trails";
  id: number;
}

export interface GQLUpdateSelfDraft {
  /**
   * update single row of the table: "trails"
   */
  update_trails_by_pk: GQLUpdateSelfDraft_update_trails_by_pk | null;
}

export interface GQLUpdateSelfDraftVariables {
  trailId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLSetCalendarId
// ====================================================

export interface GQLSetCalendarId_update_kennels_returning {
  __typename: "kennels";
  id: number;
}

export interface GQLSetCalendarId_update_kennels {
  __typename: "kennels_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: GQLSetCalendarId_update_kennels_returning[];
}

export interface GQLSetCalendarId {
  /**
   * update data of the table: "kennels"
   */
  update_kennels: GQLSetCalendarId_update_kennels | null;
}

export interface GQLSetCalendarIdVariables {
  cal?: string | null;
  kennelID?: number | null;
  userEmail?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLDeleteVerify
// ====================================================

export interface GQLDeleteVerify_trails_hares {
  __typename: "hares";
  hasher: number;
}

export interface GQLDeleteVerify_trails_kennelInfo {
  __typename: "kennels";
  google_refresh: string | null;
  google_token: string | null;
}

export interface GQLDeleteVerify_trails {
  __typename: "trails";
  /**
   * An array relationship
   */
  hares: GQLDeleteVerify_trails_hares[];
  google_calendar: string | null;
  kennel: number;
  /**
   * An object relationship
   */
  kennelInfo: GQLDeleteVerify_trails_kennelInfo;
}

export interface GQLDeleteVerify {
  /**
   * An array relationship
   */
  trails: GQLDeleteVerify_trails[];
}

export interface GQLDeleteVerifyVariables {
  trailId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLEditTrailInfo
// ====================================================

export interface GQLEditTrailInfo_trails_hares {
  __typename: "hares";
  hasher: number;
}

export interface GQLEditTrailInfo_trails_draftFor_hares {
  __typename: "hares";
  hasher: number;
}

export interface GQLEditTrailInfo_trails_draftFor {
  __typename: "trails";
  id: number;
  draft: number | null;
  google_calendar: string | null;
  kennel: number;
  /**
   * An array relationship
   */
  hares: GQLEditTrailInfo_trails_draftFor_hares[];
}

export interface GQLEditTrailInfo_trails {
  __typename: "trails";
  id: number;
  draft: number | null;
  google_calendar: string | null;
  kennel: number;
  /**
   * An array relationship
   */
  hares: GQLEditTrailInfo_trails_hares[];
  /**
   * An object relationship
   */
  draftFor: GQLEditTrailInfo_trails_draftFor | null;
}

export interface GQLEditTrailInfo {
  /**
   * An array relationship
   */
  trails: GQLEditTrailInfo_trails[];
}

export interface GQLEditTrailInfoVariables {
  trailId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLHasherInfo
// ====================================================

export interface GQLHasherInfo_hashers_gm {
  __typename: "kennels";
  id: number;
  name: string | null;
}

export interface GQLHasherInfo_hashers {
  __typename: "hashers";
  name: string | null;
  /**
   * An array relationship
   */
  gm: GQLHasherInfo_hashers_gm[];
}

export interface GQLHasherInfo {
  /**
   * fetch data from the table: "hashers"
   */
  hashers: GQLHasherInfo_hashers[];
}

export interface GQLHasherInfoVariables {
  hasherId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLPageHasher
// ====================================================

export interface GQLPageHasher_hashers_gm {
  __typename: "kennels";
  id: number;
  name: string | null;
  short_name: string | null;
}

export interface GQLPageHasher_hashers {
  __typename: "hashers";
  name: string | null;
  email: string | null;
  /**
   * An array relationship
   */
  gm: GQLPageHasher_hashers_gm[];
}

export interface GQLPageHasher {
  /**
   * fetch data from the table: "hashers"
   */
  hashers: GQLPageHasher_hashers[];
}

export interface GQLPageHasherVariables {
  hasherId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLKennelEditPageSSR
// ====================================================

export interface GQLKennelEditPageSSR_kennels {
  __typename: "kennels";
  id: number;
  short_name: string | null;
  google_refresh: string | null;
  google_token: string | null;
  google_calendar: string | null;
}

export interface GQLKennelEditPageSSR {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLKennelEditPageSSR_kennels[];
}

export interface GQLKennelEditPageSSRVariables {
  kennelId?: number | null;
  email?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLHareRank
// ====================================================

export interface GQLHareRank_hashers_hares_aggregate_aggregate {
  __typename: "hares_aggregate_fields";
  count: number;
}

export interface GQLHareRank_hashers_hares_aggregate {
  __typename: "hares_aggregate";
  aggregate: GQLHareRank_hashers_hares_aggregate_aggregate | null;
}

export interface GQLHareRank_hashers {
  __typename: "hashers";
  name: string | null;
  id: number;
  /**
   * An aggregate relationship
   */
  hares_aggregate: GQLHareRank_hashers_hares_aggregate;
}

export interface GQLHareRank {
  /**
   * fetch data from the table: "hashers"
   */
  hashers: GQLHareRank_hashers[];
}

export interface GQLHareRankVariables {
  kennelId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetKennelPage
// ====================================================

export interface GQLGetKennelPage_kennels_trails_hares_hasherInfo {
  __typename: "hashers";
  name: string | null;
}

export interface GQLGetKennelPage_kennels_trails_hares {
  __typename: "hares";
  /**
   * An object relationship
   */
  hasherInfo: GQLGetKennelPage_kennels_trails_hares_hasherInfo;
}

export interface GQLGetKennelPage_kennels_trails {
  __typename: "trails";
  calculated_number: number | null;
  /**
   * An array relationship
   */
  hares: GQLGetKennelPage_kennels_trails_hares[];
  id: number;
  start: any;
  name: string;
}

export interface GQLGetKennelPage_kennels {
  __typename: "kennels";
  short_name: string | null;
  name: string | null;
  id: number;
  description: string | null;
  area: string | null;
  web: string | null;
  /**
   * An array relationship
   */
  trails: GQLGetKennelPage_kennels_trails[];
}

export interface GQLGetKennelPage {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLGetKennelPage_kennels[];
}

export interface GQLGetKennelPageVariables {
  kennelId?: number | null;
  after?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetKennels
// ====================================================

export interface GQLGetKennels_kennels {
  __typename: "kennels";
  short_name: string | null;
  name: string | null;
  id: number;
  description: string | null;
}

export interface GQLGetKennels {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLGetKennels_kennels[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLPageTrails
// ====================================================

export interface GQLPageTrails_trails_kennelInfo {
  __typename: "kennels";
  short_name: string | null;
  id: number;
}

export interface GQLPageTrails_trails {
  __typename: "trails";
  calculated_number: number | null;
  name: string;
  start: any;
  /**
   * An object relationship
   */
  kennelInfo: GQLPageTrails_trails_kennelInfo;
  id: number;
}

export interface GQLPageTrails {
  /**
   * An array relationship
   */
  trails: GQLPageTrails_trails[];
}

export interface GQLPageTrailsVariables {
  after?: any | null;
  limit?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUpdateGoogleTokens
// ====================================================

export interface GQLUpdateGoogleTokens_update_kennels {
  __typename: "kennels_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface GQLUpdateGoogleTokens {
  /**
   * update data of the table: "kennels"
   */
  update_kennels: GQLUpdateGoogleTokens_update_kennels | null;
}

export interface GQLUpdateGoogleTokensVariables {
  accessToken?: string | null;
  refreshToken?: string | null;
  kennelID?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLPageHasherHares
// ====================================================

export interface GQLPageHasherHares_kennels_trails_aggregate_aggregate {
  __typename: "trails_aggregate_fields";
  count: number;
}

export interface GQLPageHasherHares_kennels_trails_aggregate {
  __typename: "trails_aggregate";
  aggregate: GQLPageHasherHares_kennels_trails_aggregate_aggregate | null;
}

export interface GQLPageHasherHares_kennels {
  __typename: "kennels";
  id: number;
  short_name: string | null;
  /**
   * An aggregate relationship
   */
  trails_aggregate: GQLPageHasherHares_kennels_trails_aggregate;
}

export interface GQLPageHasherHares {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLPageHasherHares_kennels[];
}

export interface GQLPageHasherHaresVariables {
  hasherId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetHasherNames
// ====================================================

export interface GQLGetHasherNames_hashers {
  __typename: "hashers";
  name: string | null;
  id: number;
}

export interface GQLGetHasherNames {
  /**
   * fetch data from the table: "hashers"
   */
  hashers: GQLGetHasherNames_hashers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLPageTrailId
// ====================================================

export interface GQLPageTrailId_trails_kennelInfo {
  __typename: "kennels";
  name: string | null;
  short_name: string | null;
  id: number;
}

export interface GQLPageTrailId_trails_hares_hasherInfo {
  __typename: "hashers";
  name: string | null;
  id: number;
}

export interface GQLPageTrailId_trails_hares {
  __typename: "hares";
  /**
   * An object relationship
   */
  hasherInfo: GQLPageTrailId_trails_hares_hasherInfo;
}

export interface GQLPageTrailId_trails {
  __typename: "trails";
  calculated_number: number | null;
  description: string | null;
  directions: string | null;
  /**
   * An object relationship
   */
  kennelInfo: GQLPageTrailId_trails_kennelInfo;
  id: number;
  latitude: any | null;
  longitude: any | null;
  name: string;
  start: any;
  /**
   * An array relationship
   */
  hares: GQLPageTrailId_trails_hares[];
}

export interface GQLPageTrailId {
  /**
   * An array relationship
   */
  trails: GQLPageTrailId_trails[];
}

export interface GQLPageTrailIdVariables {
  trailId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLVerifyCalendarAdmin
// ====================================================

export interface GQLVerifyCalendarAdmin_kennels {
  __typename: "kennels";
  id: number;
}

export interface GQLVerifyCalendarAdmin {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLVerifyCalendarAdmin_kennels[];
}

export interface GQLVerifyCalendarAdminVariables {
  kennelId?: number | null;
  email?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLRefreshKennelAddCount
// ====================================================

export interface GQLRefreshKennelAddCount_kennels_trails_aggregate_aggregate {
  __typename: "trails_aggregate_fields";
  count: number;
}

export interface GQLRefreshKennelAddCount_kennels_trails_aggregate {
  __typename: "trails_aggregate";
  aggregate: GQLRefreshKennelAddCount_kennels_trails_aggregate_aggregate | null;
}

export interface GQLRefreshKennelAddCount_kennels {
  __typename: "kennels";
  google_calendar: string | null;
  short_name: string | null;
  google_refresh: string | null;
  google_token: string | null;
  id: number;
  name: string | null;
  /**
   * An aggregate relationship
   */
  trails_aggregate: GQLRefreshKennelAddCount_kennels_trails_aggregate;
}

export interface GQLRefreshKennelAddCount {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLRefreshKennelAddCount_kennels[];
}

export interface GQLRefreshKennelAddCountVariables {
  kennelID?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLAddToCalendar
// ====================================================

export interface GQLAddToCalendar_trails_hares_hasherInfo {
  __typename: "hashers";
  name: string | null;
}

export interface GQLAddToCalendar_trails_hares {
  __typename: "hares";
  /**
   * An object relationship
   */
  hasherInfo: GQLAddToCalendar_trails_hares_hasherInfo;
}

export interface GQLAddToCalendar_trails {
  __typename: "trails";
  calculated_number: number | null;
  id: number;
  name: string;
  start: any;
  latitude: any | null;
  longitude: any | null;
  directions: string | null;
  google_calendar: string | null;
  description: string | null;
  /**
   * An array relationship
   */
  hares: GQLAddToCalendar_trails_hares[];
}

export interface GQLAddToCalendar {
  /**
   * An array relationship
   */
  trails: GQLAddToCalendar_trails[];
}

export interface GQLAddToCalendarVariables {
  kennelID?: number | null;
  limit?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetGoogleCalendarId
// ====================================================

export interface GQLGetGoogleCalendarId_kennels {
  __typename: "kennels";
  google_calendar: string | null;
  google_refresh: string | null;
  google_token: string | null;
}

export interface GQLGetGoogleCalendarId {
  /**
   * fetch data from the table: "kennels"
   */
  kennels: GQLGetGoogleCalendarId_kennels[];
}

export interface GQLGetGoogleCalendarIdVariables {
  kennelId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLCountSetCalendarEntries
// ====================================================

export interface GQLCountSetCalendarEntries_trails_aggregate_aggregate {
  __typename: "trails_aggregate_fields";
  count: number;
}

export interface GQLCountSetCalendarEntries_trails_aggregate {
  __typename: "trails_aggregate";
  aggregate: GQLCountSetCalendarEntries_trails_aggregate_aggregate | null;
}

export interface GQLCountSetCalendarEntries {
  /**
   * An aggregate relationship
   */
  trails_aggregate: GQLCountSetCalendarEntries_trails_aggregate;
}

export interface GQLCountSetCalendarEntriesVariables {
  kennelId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLAllSetCalendarEntries
// ====================================================

export interface GQLAllSetCalendarEntries_trails {
  __typename: "trails";
  google_calendar: string | null;
  id: number;
}

export interface GQLAllSetCalendarEntries {
  /**
   * An array relationship
   */
  trails: GQLAllSetCalendarEntries_trails[];
}

export interface GQLAllSetCalendarEntriesVariables {
  kennelId?: number | null;
  limit?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLClearCalendarInfoFromTrail
// ====================================================

export interface GQLClearCalendarInfoFromTrail_update_trails {
  __typename: "trails_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface GQLClearCalendarInfoFromTrail {
  /**
   * update data of the table: "trails"
   */
  update_trails: GQLClearCalendarInfoFromTrail_update_trails | null;
}

export interface GQLClearCalendarInfoFromTrailVariables {
  trailIds?: number[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLMarkClean
// ====================================================

export interface GQLMarkClean_update_trails {
  __typename: "trails_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface GQLMarkClean {
  /**
   * update data of the table: "trails"
   */
  update_trails: GQLMarkClean_update_trails | null;
}

export interface GQLMarkCleanVariables {
  trailId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUpdateTrailGID
// ====================================================

export interface GQLUpdateTrailGID_update_trails {
  __typename: "trails_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
}

export interface GQLUpdateTrailGID {
  /**
   * update data of the table: "trails"
   */
  update_trails: GQLUpdateTrailGID_update_trails | null;
}

export interface GQLUpdateTrailGIDVariables {
  gid?: string | null;
  trailId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLCalendarUpdate
// ====================================================

export interface GQLCalendarUpdate_trails_hares_hasherInfo {
  __typename: "hashers";
  name: string | null;
}

export interface GQLCalendarUpdate_trails_hares {
  __typename: "hares";
  /**
   * An object relationship
   */
  hasherInfo: GQLCalendarUpdate_trails_hares_hasherInfo;
}

export interface GQLCalendarUpdate_trails_kennelInfo {
  __typename: "kennels";
  google_calendar: string | null;
  short_name: string | null;
  google_refresh: string | null;
  google_token: string | null;
  id: number;
  name: string | null;
}

export interface GQLCalendarUpdate_trails {
  __typename: "trails";
  calculated_number: number | null;
  id: number;
  name: string;
  start: any;
  latitude: any | null;
  longitude: any | null;
  directions: string | null;
  google_calendar: string | null;
  description: string | null;
  /**
   * An array relationship
   */
  hares: GQLCalendarUpdate_trails_hares[];
  gcal_dirty: boolean;
  /**
   * An object relationship
   */
  kennelInfo: GQLCalendarUpdate_trails_kennelInfo;
}

export interface GQLCalendarUpdate {
  /**
   * An array relationship
   */
  trails: GQLCalendarUpdate_trails[];
}

export interface GQLCalendarUpdateVariables {
  kennelId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLDeleteTrail
// ====================================================

export interface GQLDeleteTrail_delete_trails_returning_kennelInfo {
  __typename: "kennels";
  google_refresh: string | null;
  google_token: string | null;
  google_calendar: string | null;
}

export interface GQLDeleteTrail_delete_trails_returning {
  __typename: "trails";
  google_calendar: string | null;
  /**
   * An object relationship
   */
  kennelInfo: GQLDeleteTrail_delete_trails_returning_kennelInfo;
}

export interface GQLDeleteTrail_delete_trails {
  __typename: "trails_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
  /**
   * data from the rows affected by the mutation
   */
  returning: GQLDeleteTrail_delete_trails_returning[];
}

export interface GQLDeleteTrail {
  /**
   * delete data from the table: "trails"
   */
  delete_trails: GQLDeleteTrail_delete_trails | null;
}

export interface GQLDeleteTrailVariables {
  trailId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLFixTrailNumberInfo
// ====================================================

export interface GQLFixTrailNumberInfo_trails_hares_hasherInfo {
  __typename: "hashers";
  id: number;
}

export interface GQLFixTrailNumberInfo_trails_hares {
  __typename: "hares";
  /**
   * An object relationship
   */
  hasherInfo: GQLFixTrailNumberInfo_trails_hares_hasherInfo;
}

export interface GQLFixTrailNumberInfo_trails {
  __typename: "trails";
  number: number | null;
  calculated_number: number | null;
  id: number;
  start: any;
  /**
   * An array relationship
   */
  hares: GQLFixTrailNumberInfo_trails_hares[];
}

export interface GQLFixTrailNumberInfo {
  /**
   * An array relationship
   */
  trails: GQLFixTrailNumberInfo_trails[];
}

export interface GQLFixTrailNumberInfoVariables {
  kennelId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUpdateCalculatedNumber
// ====================================================

export interface GQLUpdateCalculatedNumber_update_trails_by_pk {
  __typename: "trails";
  id: number;
}

export interface GQLUpdateCalculatedNumber {
  /**
   * update single row of the table: "trails"
   */
  update_trails_by_pk: GQLUpdateCalculatedNumber_update_trails_by_pk | null;
}

export interface GQLUpdateCalculatedNumberVariables {
  id: number;
  calculated_number?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLInsertTrail
// ====================================================

export interface GQLInsertTrail_insert_trails_one {
  __typename: "trails";
  id: number;
}

export interface GQLInsertTrail {
  /**
   * insert a single row into the table: "trails"
   */
  insert_trails_one: GQLInsertTrail_insert_trails_one | null;
}

export interface GQLInsertTrailVariables {
  id?: number | null;
  calculated_number?: number | null;
  description?: string | null;
  directions?: string | null;
  draft?: number | null;
  google_calendar?: string | null;
  hares: hares_insert_input[];
  kennel?: number | null;
  latitude?: any | null;
  longitude?: any | null;
  name?: string | null;
  number?: number | null;
  start?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLInsertTrailDraft
// ====================================================

export interface GQLInsertTrailDraft_insert_trails_one {
  __typename: "trails";
  id: number;
}

export interface GQLInsertTrailDraft {
  /**
   * insert a single row into the table: "trails"
   */
  insert_trails_one: GQLInsertTrailDraft_insert_trails_one | null;
}

export interface GQLInsertTrailDraftVariables {
  calculated_number?: number | null;
  description?: string | null;
  directions?: string | null;
  draft?: number | null;
  google_calendar?: string | null;
  hares: hares_insert_input[];
  kennel?: number | null;
  latitude?: any | null;
  longitude?: any | null;
  name?: string | null;
  number?: number | null;
  start?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetUserByEmail
// ====================================================

export interface GQLGetUserByEmail_hashers {
  __typename: "hashers";
  id: number;
  email: string | null;
  name: string | null;
  email_verified: any | null;
}

export interface GQLGetUserByEmail {
  /**
   * fetch data from the table: "hashers"
   */
  hashers: GQLGetUserByEmail_hashers[];
}

export interface GQLGetUserByEmailVariables {
  email?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLCreateVerificationToken
// ====================================================

export interface GQLCreateVerificationToken_update_hashers_returning {
  __typename: "hashers";
  id: number;
}

export interface GQLCreateVerificationToken_update_hashers {
  __typename: "hashers_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: GQLCreateVerificationToken_update_hashers_returning[];
}

export interface GQLCreateVerificationToken {
  /**
   * update data of the table: "hashers"
   */
  update_hashers: GQLCreateVerificationToken_update_hashers | null;
}

export interface GQLCreateVerificationTokenVariables {
  token?: string | null;
  expires?: any | null;
  email?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLCheckVerificationToken
// ====================================================

export interface GQLCheckVerificationToken_hashers {
  __typename: "hashers";
  login_expires: any | null;
}

export interface GQLCheckVerificationToken {
  /**
   * fetch data from the table: "hashers"
   */
  hashers: GQLCheckVerificationToken_hashers[];
}

export interface GQLCheckVerificationTokenVariables {
  identifier?: string | null;
  token?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUseVerificationToken
// ====================================================

export interface GQLUseVerificationToken_update_hashers_returning {
  __typename: "hashers";
  login_expires: any | null;
}

export interface GQLUseVerificationToken_update_hashers {
  __typename: "hashers_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: GQLUseVerificationToken_update_hashers_returning[];
}

export interface GQLUseVerificationToken {
  /**
   * update data of the table: "hashers"
   */
  update_hashers: GQLUseVerificationToken_update_hashers | null;
}

export interface GQLUseVerificationTokenVariables {
  identifier?: string | null;
  token?: string | null;
  email_verified?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetSessionAndUser
// ====================================================

export interface GQLGetSessionAndUser_sessions_user {
  __typename: "hashers";
  email: string | null;
  email_verified: any | null;
  id: number;
  name: string | null;
}

export interface GQLGetSessionAndUser_sessions {
  __typename: "sessions";
  id: string;
  expires: any;
  /**
   * An object relationship
   */
  user: GQLGetSessionAndUser_sessions_user;
}

export interface GQLGetSessionAndUser {
  /**
   * fetch data from the table: "sessions"
   */
  sessions: GQLGetSessionAndUser_sessions[];
}

export interface GQLGetSessionAndUserVariables {
  sessionToken?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLDeleteSession
// ====================================================

export interface GQLDeleteSession_delete_sessions_returning {
  __typename: "sessions";
  expires: any;
  id: string;
  user_id: number;
}

export interface GQLDeleteSession_delete_sessions {
  __typename: "sessions_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: GQLDeleteSession_delete_sessions_returning[];
}

export interface GQLDeleteSession {
  /**
   * delete data from the table: "sessions"
   */
  delete_sessions: GQLDeleteSession_delete_sessions | null;
}

export interface GQLDeleteSessionVariables {
  sessionToken?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUpdateUser
// ====================================================

export interface GQLUpdateUser_update_hashers_returning {
  __typename: "hashers";
  email: string | null;
  email_verified: any | null;
  id: number;
  name: string | null;
}

export interface GQLUpdateUser_update_hashers {
  __typename: "hashers_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: GQLUpdateUser_update_hashers_returning[];
}

export interface GQLUpdateUser {
  /**
   * update data of the table: "hashers"
   */
  update_hashers: GQLUpdateUser_update_hashers | null;
}

export interface GQLUpdateUserVariables {
  id?: number | null;
  emailVerified?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLCreateSession
// ====================================================

export interface GQLCreateSession_insert_sessions_one {
  __typename: "sessions";
  id: string;
}

export interface GQLCreateSession {
  /**
   * insert a single row into the table: "sessions"
   */
  insert_sessions_one: GQLCreateSession_insert_sessions_one | null;
}

export interface GQLCreateSessionVariables {
  sessionToken?: string | null;
  userId?: number | null;
  expires?: any | null;
  id?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLCreateUser
// ====================================================

export interface GQLCreateUser_insert_hashers_one {
  __typename: "hashers";
  id: number;
}

export interface GQLCreateUser {
  /**
   * insert a single row into the table: "hashers"
   */
  insert_hashers_one: GQLCreateUser_insert_hashers_one | null;
}

export interface GQLCreateUserVariables {
  email?: string | null;
  name?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetUser
// ====================================================

export interface GQLGetUser_hashers {
  __typename: "hashers";
  email: string | null;
  email_verified: any | null;
  name: string | null;
}

export interface GQLGetUser {
  /**
   * fetch data from the table: "hashers"
   */
  hashers: GQLGetUser_hashers[];
}

export interface GQLGetUserVariables {
  id?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLGetUserByAccount
// ====================================================

export interface GQLGetUserByAccount_account_links_user {
  __typename: "hashers";
  id: number;
  email: string | null;
  email_verified: any | null;
  name: string | null;
}

export interface GQLGetUserByAccount_account_links {
  __typename: "account_links";
  /**
   * An object relationship
   */
  user: GQLGetUserByAccount_account_links_user;
}

export interface GQLGetUserByAccount {
  /**
   * fetch data from the table: "account_links"
   */
  account_links: GQLGetUserByAccount_account_links[];
}

export interface GQLGetUserByAccountVariables {
  provider?: string | null;
  providerAccountId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLLinkAccount
// ====================================================

export interface GQLLinkAccount_insert_account_links_one {
  __typename: "account_links";
  user_id: number;
}

export interface GQLLinkAccount {
  /**
   * insert a single row into the table: "account_links"
   */
  insert_account_links_one: GQLLinkAccount_insert_account_links_one | null;
}

export interface GQLLinkAccountVariables {
  provider?: string | null;
  providerAccountId?: string | null;
  userId?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GQLUpdateSession
// ====================================================

export interface GQLUpdateSession_sessions {
  __typename: "sessions";
  id: string;
  user_id: number;
  expires: any;
}

export interface GQLUpdateSession {
  /**
   * fetch data from the table: "sessions"
   */
  sessions: GQLUpdateSession_sessions[];
}

export interface GQLUpdateSessionVariables {
  sessionToken?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GQLUpdateCalendarToken
// ====================================================

export interface GQLUpdateCalendarToken_update_kennels_returning {
  __typename: "kennels";
  id: number;
}

export interface GQLUpdateCalendarToken_update_kennels {
  __typename: "kennels_mutation_response";
  /**
   * data from the rows affected by the mutation
   */
  returning: GQLUpdateCalendarToken_update_kennels_returning[];
}

export interface GQLUpdateCalendarToken {
  /**
   * update data of the table: "kennels"
   */
  update_kennels: GQLUpdateCalendarToken_update_kennels | null;
}

export interface GQLUpdateCalendarTokenVariables {
  calendar?: string | null;
  refreshToken?: string | null;
  accessToken?: string | null;
  kennelID?: number | null;
  userEmail?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GQLTrailInfoFragment
// ====================================================

export interface GQLTrailInfoFragment_hares {
  __typename: "hares";
  hasher: number;
}

export interface GQLTrailInfoFragment {
  __typename: "trails";
  id: number;
  draft: number | null;
  google_calendar: string | null;
  kennel: number;
  /**
   * An array relationship
   */
  hares: GQLTrailInfoFragment_hares[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PublicHasherInfo
// ====================================================

export interface PublicHasherInfo {
  __typename: "hashers";
  name: string | null;
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GQLKennelListFragment
// ====================================================

export interface GQLKennelListFragment {
  __typename: "kennels";
  id: number;
  name: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PublicFragmentTrail
// ====================================================

export interface PublicFragmentTrail_kennelInfo {
  __typename: "kennels";
  name: string | null;
  short_name: string | null;
  id: number;
}

export interface PublicFragmentTrail_hares_hasherInfo {
  __typename: "hashers";
  name: string | null;
  id: number;
}

export interface PublicFragmentTrail_hares {
  __typename: "hares";
  /**
   * An object relationship
   */
  hasherInfo: PublicFragmentTrail_hares_hasherInfo;
}

export interface PublicFragmentTrail {
  __typename: "trails";
  calculated_number: number | null;
  description: string | null;
  directions: string | null;
  /**
   * An object relationship
   */
  kennelInfo: PublicFragmentTrail_kennelInfo;
  id: number;
  latitude: any | null;
  longitude: any | null;
  name: string;
  start: any;
  /**
   * An array relationship
   */
  hares: PublicFragmentTrail_hares[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GQLInsertFragment
// ====================================================

export interface GQLInsertFragment_hares_hasherInfo {
  __typename: "hashers";
  name: string | null;
}

export interface GQLInsertFragment_hares {
  __typename: "hares";
  /**
   * An object relationship
   */
  hasherInfo: GQLInsertFragment_hares_hasherInfo;
}

export interface GQLInsertFragment {
  __typename: "trails";
  calculated_number: number | null;
  id: number;
  name: string;
  start: any;
  latitude: any | null;
  longitude: any | null;
  directions: string | null;
  google_calendar: string | null;
  description: string | null;
  /**
   * An array relationship
   */
  hares: GQLInsertFragment_hares[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GQLKennelInfoFragment
// ====================================================

export interface GQLKennelInfoFragment {
  __typename: "kennels";
  google_calendar: string | null;
  short_name: string | null;
  google_refresh: string | null;
  google_token: string | null;
  id: number;
  name: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GQLHareCheckFragment
// ====================================================

export interface GQLHareCheckFragment_hares {
  __typename: "hares";
  hasher: number;
}

export interface GQLHareCheckFragment {
  __typename: "trails";
  /**
   * An array relationship
   */
  hares: GQLHareCheckFragment_hares[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * unique or primary key constraints on table "hares"
 */
export enum hares_constraint {
  hare_index = "hare_index",
}

/**
 * update columns of table "hares"
 */
export enum hares_update_column {
  hasher = "hasher",
  trail = "trail",
}

/**
 * unique or primary key constraints on table "hashers"
 */
export enum hashers_constraint {
  hashers_email_key = "hashers_email_key",
  hashers_name_key = "hashers_name_key",
  hashers_pkey = "hashers_pkey",
}

/**
 * update columns of table "hashers"
 */
export enum hashers_update_column {
  email = "email",
  email_verified = "email_verified",
  id = "id",
  login = "login",
  login_expires = "login_expires",
  name = "name",
}

/**
 * unique or primary key constraints on table "kennels"
 */
export enum kennels_constraint {
  kennels_pkey = "kennels_pkey",
}

/**
 * update columns of table "kennels"
 */
export enum kennels_update_column {
  area = "area",
  dc_verify = "dc_verify",
  description = "description",
  frequency = "frequency",
  gm_email = "gm_email",
  gm_verify = "gm_verify",
  google_calendar = "google_calendar",
  google_refresh = "google_refresh",
  google_token = "google_token",
  id = "id",
  name = "name",
  next = "next",
  short_name = "short_name",
  timezone = "timezone",
  web = "web",
}

/**
 * unique or primary key constraints on table "trails"
 */
export enum trails_constraint {
  trails_pkey = "trails_pkey",
}

/**
 * update columns of table "trails"
 */
export enum trails_update_column {
  calculated_number = "calculated_number",
  description = "description",
  directions = "directions",
  draft = "draft",
  gcal_dirty = "gcal_dirty",
  google_calendar = "google_calendar",
  id = "id",
  kennel = "kennel",
  latitude = "latitude",
  longitude = "longitude",
  name = "name",
  number = "number",
  start = "start",
  verification = "verification",
}

/**
 * Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'.
 */
export interface Boolean_comparison_exp {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: boolean[] | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: boolean[] | null;
}

/**
 * Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'.
 */
export interface Int_comparison_exp {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
}

/**
 * Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _iregex?: string | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _niregex?: string | null;
  _nlike?: string | null;
  _nregex?: string | null;
  _nsimilar?: string | null;
  _regex?: string | null;
  _similar?: string | null;
}

/**
 * Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'.
 */
export interface float8_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * input type for inserting array relation for remote table "hares"
 */
export interface hares_arr_rel_insert_input {
  data: hares_insert_input[];
  on_conflict?: hares_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "hares". All fields are combined with a logical 'AND'.
 */
export interface hares_bool_exp {
  _and?: hares_bool_exp[] | null;
  _not?: hares_bool_exp | null;
  _or?: hares_bool_exp[] | null;
  hasher?: Int_comparison_exp | null;
  hasherInfo?: hashers_bool_exp | null;
  trail?: Int_comparison_exp | null;
  trailInfo?: trails_bool_exp | null;
}

/**
 * input type for inserting data into table "hares"
 */
export interface hares_insert_input {
  hasher?: number | null;
  hasherInfo?: hashers_obj_rel_insert_input | null;
  trail?: number | null;
  trailInfo?: trails_obj_rel_insert_input | null;
}

/**
 * on conflict condition type for table "hares"
 */
export interface hares_on_conflict {
  constraint: hares_constraint;
  update_columns: hares_update_column[];
  where?: hares_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "hashers". All fields are combined with a logical 'AND'.
 */
export interface hashers_bool_exp {
  _and?: hashers_bool_exp[] | null;
  _not?: hashers_bool_exp | null;
  _or?: hashers_bool_exp[] | null;
  email?: String_comparison_exp | null;
  email_verified?: timestamptz_comparison_exp | null;
  gm?: kennels_bool_exp | null;
  hares?: hares_bool_exp | null;
  id?: Int_comparison_exp | null;
  login?: String_comparison_exp | null;
  login_expires?: timestamptz_comparison_exp | null;
  name?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "hashers"
 */
export interface hashers_insert_input {
  email?: string | null;
  email_verified?: any | null;
  gm?: kennels_arr_rel_insert_input | null;
  hares?: hares_arr_rel_insert_input | null;
  id?: number | null;
  login?: string | null;
  login_expires?: any | null;
  name?: string | null;
}

/**
 * input type for inserting object relation for remote table "hashers"
 */
export interface hashers_obj_rel_insert_input {
  data: hashers_insert_input;
  on_conflict?: hashers_on_conflict | null;
}

/**
 * on conflict condition type for table "hashers"
 */
export interface hashers_on_conflict {
  constraint: hashers_constraint;
  update_columns: hashers_update_column[];
  where?: hashers_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "kennels"
 */
export interface kennels_arr_rel_insert_input {
  data: kennels_insert_input[];
  on_conflict?: kennels_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "kennels". All fields are combined with a logical 'AND'.
 */
export interface kennels_bool_exp {
  _and?: kennels_bool_exp[] | null;
  _not?: kennels_bool_exp | null;
  _or?: kennels_bool_exp[] | null;
  area?: String_comparison_exp | null;
  dc_verify?: String_comparison_exp | null;
  description?: String_comparison_exp | null;
  frequency?: Int_comparison_exp | null;
  gm?: hashers_bool_exp | null;
  gm_email?: String_comparison_exp | null;
  gm_verify?: String_comparison_exp | null;
  google_calendar?: String_comparison_exp | null;
  google_refresh?: String_comparison_exp | null;
  google_token?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  name?: String_comparison_exp | null;
  next?: timestamptz_comparison_exp | null;
  short_name?: String_comparison_exp | null;
  timezone?: String_comparison_exp | null;
  trails?: trails_bool_exp | null;
  web?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "kennels"
 */
export interface kennels_insert_input {
  area?: string | null;
  dc_verify?: string | null;
  description?: string | null;
  frequency?: number | null;
  gm?: hashers_obj_rel_insert_input | null;
  gm_email?: string | null;
  gm_verify?: string | null;
  google_calendar?: string | null;
  google_refresh?: string | null;
  google_token?: string | null;
  id?: number | null;
  name?: string | null;
  next?: any | null;
  short_name?: string | null;
  timezone?: string | null;
  trails?: trails_arr_rel_insert_input | null;
  web?: string | null;
}

/**
 * input type for inserting object relation for remote table "kennels"
 */
export interface kennels_obj_rel_insert_input {
  data: kennels_insert_input;
  on_conflict?: kennels_on_conflict | null;
}

/**
 * on conflict condition type for table "kennels"
 */
export interface kennels_on_conflict {
  constraint: kennels_constraint;
  update_columns: kennels_update_column[];
  where?: kennels_bool_exp | null;
}

/**
 * Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * input type for inserting array relation for remote table "trails"
 */
export interface trails_arr_rel_insert_input {
  data: trails_insert_input[];
  on_conflict?: trails_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "trails". All fields are combined with a logical 'AND'.
 */
export interface trails_bool_exp {
  _and?: trails_bool_exp[] | null;
  _not?: trails_bool_exp | null;
  _or?: trails_bool_exp[] | null;
  calculated_number?: Int_comparison_exp | null;
  description?: String_comparison_exp | null;
  directions?: String_comparison_exp | null;
  draft?: Int_comparison_exp | null;
  draftFor?: trails_bool_exp | null;
  drafts?: trails_bool_exp | null;
  gcal_dirty?: Boolean_comparison_exp | null;
  google_calendar?: String_comparison_exp | null;
  hares?: hares_bool_exp | null;
  id?: Int_comparison_exp | null;
  kennel?: Int_comparison_exp | null;
  kennelInfo?: kennels_bool_exp | null;
  latitude?: float8_comparison_exp | null;
  longitude?: float8_comparison_exp | null;
  name?: String_comparison_exp | null;
  number?: Int_comparison_exp | null;
  start?: timestamptz_comparison_exp | null;
  verification?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "trails"
 */
export interface trails_insert_input {
  calculated_number?: number | null;
  description?: string | null;
  directions?: string | null;
  draft?: number | null;
  draftFor?: trails_obj_rel_insert_input | null;
  drafts?: trails_arr_rel_insert_input | null;
  gcal_dirty?: boolean | null;
  google_calendar?: string | null;
  hares?: hares_arr_rel_insert_input | null;
  id?: number | null;
  kennel?: number | null;
  kennelInfo?: kennels_obj_rel_insert_input | null;
  latitude?: any | null;
  longitude?: any | null;
  name?: string | null;
  number?: number | null;
  start?: any | null;
  verification?: string | null;
}

/**
 * input type for inserting object relation for remote table "trails"
 */
export interface trails_obj_rel_insert_input {
  data: trails_insert_input;
  on_conflict?: trails_on_conflict | null;
}

/**
 * on conflict condition type for table "trails"
 */
export interface trails_on_conflict {
  constraint: trails_constraint;
  update_columns: trails_update_column[];
  where?: trails_bool_exp | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
