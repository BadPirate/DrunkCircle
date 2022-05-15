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
  google_refresh: string | null;
  google_token: string | null;
  google_calendar: string | null;
  id: number;
  name: string | null;
  short_name: string | null;
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
  description: string | null;
  directions: string | null;
  /**
   * An array relationship
   */
  hares: GQLAddToCalendar_trails_hares[];
  latitude: any | null;
  longitude: any | null;
  name: string;
  start: any;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
