import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bit: any;
  float8: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "account_links" */
export type Account_Links = {
  __typename?: 'account_links';
  provider: Scalars['String'];
  provider_id: Scalars['String'];
  /** An object relationship */
  user: Hashers;
  user_id: Scalars['Int'];
};

/** aggregated selection of "account_links" */
export type Account_Links_Aggregate = {
  __typename?: 'account_links_aggregate';
  aggregate?: Maybe<Account_Links_Aggregate_Fields>;
  nodes: Array<Account_Links>;
};

/** aggregate fields of "account_links" */
export type Account_Links_Aggregate_Fields = {
  __typename?: 'account_links_aggregate_fields';
  avg?: Maybe<Account_Links_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Account_Links_Max_Fields>;
  min?: Maybe<Account_Links_Min_Fields>;
  stddev?: Maybe<Account_Links_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Links_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Links_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Links_Sum_Fields>;
  var_pop?: Maybe<Account_Links_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Links_Var_Samp_Fields>;
  variance?: Maybe<Account_Links_Variance_Fields>;
};


/** aggregate fields of "account_links" */
export type Account_Links_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Account_Links_Avg_Fields = {
  __typename?: 'account_links_avg_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "account_links". All fields are combined with a logical 'AND'. */
export type Account_Links_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Links_Bool_Exp>>;
  _not?: InputMaybe<Account_Links_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Links_Bool_Exp>>;
  provider?: InputMaybe<String_Comparison_Exp>;
  provider_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Hashers_Bool_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "account_links" */
export enum Account_Links_Constraint {
  /** unique or primary key constraint on columns "user_id", "provider" */
  AccountLinksPkey = 'account_links_pkey'
}

/** input type for incrementing numeric columns in table "account_links" */
export type Account_Links_Inc_Input = {
  user_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "account_links" */
export type Account_Links_Insert_Input = {
  provider?: InputMaybe<Scalars['String']>;
  provider_id?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Hashers_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Account_Links_Max_Fields = {
  __typename?: 'account_links_max_fields';
  provider?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Account_Links_Min_Fields = {
  __typename?: 'account_links_min_fields';
  provider?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "account_links" */
export type Account_Links_Mutation_Response = {
  __typename?: 'account_links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Account_Links>;
};

/** on_conflict condition type for table "account_links" */
export type Account_Links_On_Conflict = {
  constraint: Account_Links_Constraint;
  update_columns?: Array<Account_Links_Update_Column>;
  where?: InputMaybe<Account_Links_Bool_Exp>;
};

/** Ordering options when selecting data from "account_links". */
export type Account_Links_Order_By = {
  provider?: InputMaybe<Order_By>;
  provider_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Hashers_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: account_links */
export type Account_Links_Pk_Columns_Input = {
  provider: Scalars['String'];
  user_id: Scalars['Int'];
};

/** select columns of table "account_links" */
export enum Account_Links_Select_Column {
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "account_links" */
export type Account_Links_Set_Input = {
  provider?: InputMaybe<Scalars['String']>;
  provider_id?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Account_Links_Stddev_Fields = {
  __typename?: 'account_links_stddev_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Account_Links_Stddev_Pop_Fields = {
  __typename?: 'account_links_stddev_pop_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Account_Links_Stddev_Samp_Fields = {
  __typename?: 'account_links_stddev_samp_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "account_links" */
export type Account_Links_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Links_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Links_Stream_Cursor_Value_Input = {
  provider?: InputMaybe<Scalars['String']>;
  provider_id?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Account_Links_Sum_Fields = {
  __typename?: 'account_links_sum_fields';
  user_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "account_links" */
export enum Account_Links_Update_Column {
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  UserId = 'user_id'
}

export type Account_Links_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Account_Links_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Account_Links_Set_Input>;
  /** filter the rows which have to be updated */
  where: Account_Links_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Account_Links_Var_Pop_Fields = {
  __typename?: 'account_links_var_pop_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Account_Links_Var_Samp_Fields = {
  __typename?: 'account_links_var_samp_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Account_Links_Variance_Fields = {
  __typename?: 'account_links_variance_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "attendance" */
export type Attendance = {
  __typename?: 'attendance';
  attended?: Maybe<Scalars['Boolean']>;
  hasher: Scalars['Int'];
  /** An object relationship */
  hasherInfo: Hashers;
  note?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  trail: Scalars['Int'];
};

/** aggregated selection of "attendance" */
export type Attendance_Aggregate = {
  __typename?: 'attendance_aggregate';
  aggregate?: Maybe<Attendance_Aggregate_Fields>;
  nodes: Array<Attendance>;
};

export type Attendance_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Attendance_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Attendance_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Attendance_Aggregate_Bool_Exp_Count>;
};

export type Attendance_Aggregate_Bool_Exp_Bool_And = {
  arguments: Attendance_Select_Column_Attendance_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Attendance_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Attendance_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Attendance_Select_Column_Attendance_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Attendance_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Attendance_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Attendance_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Attendance_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "attendance" */
export type Attendance_Aggregate_Fields = {
  __typename?: 'attendance_aggregate_fields';
  avg?: Maybe<Attendance_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Attendance_Max_Fields>;
  min?: Maybe<Attendance_Min_Fields>;
  stddev?: Maybe<Attendance_Stddev_Fields>;
  stddev_pop?: Maybe<Attendance_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Attendance_Stddev_Samp_Fields>;
  sum?: Maybe<Attendance_Sum_Fields>;
  var_pop?: Maybe<Attendance_Var_Pop_Fields>;
  var_samp?: Maybe<Attendance_Var_Samp_Fields>;
  variance?: Maybe<Attendance_Variance_Fields>;
};


/** aggregate fields of "attendance" */
export type Attendance_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Attendance_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "attendance" */
export type Attendance_Aggregate_Order_By = {
  avg?: InputMaybe<Attendance_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Attendance_Max_Order_By>;
  min?: InputMaybe<Attendance_Min_Order_By>;
  stddev?: InputMaybe<Attendance_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Attendance_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Attendance_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Attendance_Sum_Order_By>;
  var_pop?: InputMaybe<Attendance_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Attendance_Var_Samp_Order_By>;
  variance?: InputMaybe<Attendance_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "attendance" */
export type Attendance_Arr_Rel_Insert_Input = {
  data: Array<Attendance_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Attendance_On_Conflict>;
};

/** aggregate avg on columns */
export type Attendance_Avg_Fields = {
  __typename?: 'attendance_avg_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "attendance" */
export type Attendance_Avg_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "attendance". All fields are combined with a logical 'AND'. */
export type Attendance_Bool_Exp = {
  _and?: InputMaybe<Array<Attendance_Bool_Exp>>;
  _not?: InputMaybe<Attendance_Bool_Exp>;
  _or?: InputMaybe<Array<Attendance_Bool_Exp>>;
  attended?: InputMaybe<Boolean_Comparison_Exp>;
  hasher?: InputMaybe<Int_Comparison_Exp>;
  hasherInfo?: InputMaybe<Hashers_Bool_Exp>;
  note?: InputMaybe<String_Comparison_Exp>;
  paid?: InputMaybe<Boolean_Comparison_Exp>;
  trail?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "attendance" */
export enum Attendance_Constraint {
  /** unique or primary key constraint on columns "trail", "hasher" */
  AttendancePkey = 'attendance_pkey'
}

/** input type for incrementing numeric columns in table "attendance" */
export type Attendance_Inc_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  trail?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "attendance" */
export type Attendance_Insert_Input = {
  attended?: InputMaybe<Scalars['Boolean']>;
  hasher?: InputMaybe<Scalars['Int']>;
  hasherInfo?: InputMaybe<Hashers_Obj_Rel_Insert_Input>;
  note?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  trail?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Attendance_Max_Fields = {
  __typename?: 'attendance_max_fields';
  hasher?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  trail?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "attendance" */
export type Attendance_Max_Order_By = {
  hasher?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Attendance_Min_Fields = {
  __typename?: 'attendance_min_fields';
  hasher?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  trail?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "attendance" */
export type Attendance_Min_Order_By = {
  hasher?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "attendance" */
export type Attendance_Mutation_Response = {
  __typename?: 'attendance_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Attendance>;
};

/** on_conflict condition type for table "attendance" */
export type Attendance_On_Conflict = {
  constraint: Attendance_Constraint;
  update_columns?: Array<Attendance_Update_Column>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};

/** Ordering options when selecting data from "attendance". */
export type Attendance_Order_By = {
  attended?: InputMaybe<Order_By>;
  hasher?: InputMaybe<Order_By>;
  hasherInfo?: InputMaybe<Hashers_Order_By>;
  note?: InputMaybe<Order_By>;
  paid?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** primary key columns input for table: attendance */
export type Attendance_Pk_Columns_Input = {
  hasher: Scalars['Int'];
  trail: Scalars['Int'];
};

/** select columns of table "attendance" */
export enum Attendance_Select_Column {
  /** column name */
  Attended = 'attended',
  /** column name */
  Hasher = 'hasher',
  /** column name */
  Note = 'note',
  /** column name */
  Paid = 'paid',
  /** column name */
  Trail = 'trail'
}

/** select "attendance_aggregate_bool_exp_bool_and_arguments_columns" columns of table "attendance" */
export enum Attendance_Select_Column_Attendance_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Attended = 'attended',
  /** column name */
  Paid = 'paid'
}

/** select "attendance_aggregate_bool_exp_bool_or_arguments_columns" columns of table "attendance" */
export enum Attendance_Select_Column_Attendance_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Attended = 'attended',
  /** column name */
  Paid = 'paid'
}

/** input type for updating data in table "attendance" */
export type Attendance_Set_Input = {
  attended?: InputMaybe<Scalars['Boolean']>;
  hasher?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  trail?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Attendance_Stddev_Fields = {
  __typename?: 'attendance_stddev_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "attendance" */
export type Attendance_Stddev_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Attendance_Stddev_Pop_Fields = {
  __typename?: 'attendance_stddev_pop_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "attendance" */
export type Attendance_Stddev_Pop_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Attendance_Stddev_Samp_Fields = {
  __typename?: 'attendance_stddev_samp_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "attendance" */
export type Attendance_Stddev_Samp_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "attendance" */
export type Attendance_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Attendance_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Attendance_Stream_Cursor_Value_Input = {
  attended?: InputMaybe<Scalars['Boolean']>;
  hasher?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  trail?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Attendance_Sum_Fields = {
  __typename?: 'attendance_sum_fields';
  hasher?: Maybe<Scalars['Int']>;
  trail?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "attendance" */
export type Attendance_Sum_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** update columns of table "attendance" */
export enum Attendance_Update_Column {
  /** column name */
  Attended = 'attended',
  /** column name */
  Hasher = 'hasher',
  /** column name */
  Note = 'note',
  /** column name */
  Paid = 'paid',
  /** column name */
  Trail = 'trail'
}

export type Attendance_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Attendance_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Attendance_Set_Input>;
  /** filter the rows which have to be updated */
  where: Attendance_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Attendance_Var_Pop_Fields = {
  __typename?: 'attendance_var_pop_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "attendance" */
export type Attendance_Var_Pop_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Attendance_Var_Samp_Fields = {
  __typename?: 'attendance_var_samp_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "attendance" */
export type Attendance_Var_Samp_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Attendance_Variance_Fields = {
  __typename?: 'attendance_variance_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "attendance" */
export type Attendance_Variance_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "bit". All fields are combined with logical 'AND'. */
export type Bit_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bit']>;
  _gt?: InputMaybe<Scalars['bit']>;
  _gte?: InputMaybe<Scalars['bit']>;
  _in?: InputMaybe<Array<Scalars['bit']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bit']>;
  _lte?: InputMaybe<Scalars['bit']>;
  _neq?: InputMaybe<Scalars['bit']>;
  _nin?: InputMaybe<Array<Scalars['bit']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']>;
  _gt?: InputMaybe<Scalars['float8']>;
  _gte?: InputMaybe<Scalars['float8']>;
  _in?: InputMaybe<Array<Scalars['float8']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['float8']>;
  _lte?: InputMaybe<Scalars['float8']>;
  _neq?: InputMaybe<Scalars['float8']>;
  _nin?: InputMaybe<Array<Scalars['float8']>>;
};

/** columns and relationships of "hares" */
export type Hares = {
  __typename?: 'hares';
  hasher: Scalars['Int'];
  /** An object relationship */
  hasherInfo: Hashers;
  trail: Scalars['Int'];
  /** An object relationship */
  trailInfo: Trails;
};

/** aggregated selection of "hares" */
export type Hares_Aggregate = {
  __typename?: 'hares_aggregate';
  aggregate?: Maybe<Hares_Aggregate_Fields>;
  nodes: Array<Hares>;
};

export type Hares_Aggregate_Bool_Exp = {
  count?: InputMaybe<Hares_Aggregate_Bool_Exp_Count>;
};

export type Hares_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Hares_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Hares_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "hares" */
export type Hares_Aggregate_Fields = {
  __typename?: 'hares_aggregate_fields';
  avg?: Maybe<Hares_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Hares_Max_Fields>;
  min?: Maybe<Hares_Min_Fields>;
  stddev?: Maybe<Hares_Stddev_Fields>;
  stddev_pop?: Maybe<Hares_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Hares_Stddev_Samp_Fields>;
  sum?: Maybe<Hares_Sum_Fields>;
  var_pop?: Maybe<Hares_Var_Pop_Fields>;
  var_samp?: Maybe<Hares_Var_Samp_Fields>;
  variance?: Maybe<Hares_Variance_Fields>;
};


/** aggregate fields of "hares" */
export type Hares_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Hares_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "hares" */
export type Hares_Aggregate_Order_By = {
  avg?: InputMaybe<Hares_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Hares_Max_Order_By>;
  min?: InputMaybe<Hares_Min_Order_By>;
  stddev?: InputMaybe<Hares_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Hares_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Hares_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Hares_Sum_Order_By>;
  var_pop?: InputMaybe<Hares_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Hares_Var_Samp_Order_By>;
  variance?: InputMaybe<Hares_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "hares" */
export type Hares_Arr_Rel_Insert_Input = {
  data: Array<Hares_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Hares_On_Conflict>;
};

/** aggregate avg on columns */
export type Hares_Avg_Fields = {
  __typename?: 'hares_avg_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "hares" */
export type Hares_Avg_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "hares". All fields are combined with a logical 'AND'. */
export type Hares_Bool_Exp = {
  _and?: InputMaybe<Array<Hares_Bool_Exp>>;
  _not?: InputMaybe<Hares_Bool_Exp>;
  _or?: InputMaybe<Array<Hares_Bool_Exp>>;
  hasher?: InputMaybe<Int_Comparison_Exp>;
  hasherInfo?: InputMaybe<Hashers_Bool_Exp>;
  trail?: InputMaybe<Int_Comparison_Exp>;
  trailInfo?: InputMaybe<Trails_Bool_Exp>;
};

/** unique or primary key constraints on table "hares" */
export enum Hares_Constraint {
  /** unique or primary key constraint on columns "trail", "hasher" */
  HareIndex = 'hare_index'
}

/** input type for incrementing numeric columns in table "hares" */
export type Hares_Inc_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  trail?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "hares" */
export type Hares_Insert_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  hasherInfo?: InputMaybe<Hashers_Obj_Rel_Insert_Input>;
  trail?: InputMaybe<Scalars['Int']>;
  trailInfo?: InputMaybe<Trails_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Hares_Max_Fields = {
  __typename?: 'hares_max_fields';
  hasher?: Maybe<Scalars['Int']>;
  trail?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "hares" */
export type Hares_Max_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Hares_Min_Fields = {
  __typename?: 'hares_min_fields';
  hasher?: Maybe<Scalars['Int']>;
  trail?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "hares" */
export type Hares_Min_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "hares" */
export type Hares_Mutation_Response = {
  __typename?: 'hares_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Hares>;
};

/** on_conflict condition type for table "hares" */
export type Hares_On_Conflict = {
  constraint: Hares_Constraint;
  update_columns?: Array<Hares_Update_Column>;
  where?: InputMaybe<Hares_Bool_Exp>;
};

/** Ordering options when selecting data from "hares". */
export type Hares_Order_By = {
  hasher?: InputMaybe<Order_By>;
  hasherInfo?: InputMaybe<Hashers_Order_By>;
  trail?: InputMaybe<Order_By>;
  trailInfo?: InputMaybe<Trails_Order_By>;
};

/** select columns of table "hares" */
export enum Hares_Select_Column {
  /** column name */
  Hasher = 'hasher',
  /** column name */
  Trail = 'trail'
}

/** input type for updating data in table "hares" */
export type Hares_Set_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  trail?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Hares_Stddev_Fields = {
  __typename?: 'hares_stddev_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "hares" */
export type Hares_Stddev_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Hares_Stddev_Pop_Fields = {
  __typename?: 'hares_stddev_pop_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "hares" */
export type Hares_Stddev_Pop_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Hares_Stddev_Samp_Fields = {
  __typename?: 'hares_stddev_samp_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "hares" */
export type Hares_Stddev_Samp_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "hares" */
export type Hares_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Hares_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Hares_Stream_Cursor_Value_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  trail?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Hares_Sum_Fields = {
  __typename?: 'hares_sum_fields';
  hasher?: Maybe<Scalars['Int']>;
  trail?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "hares" */
export type Hares_Sum_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** update columns of table "hares" */
export enum Hares_Update_Column {
  /** column name */
  Hasher = 'hasher',
  /** column name */
  Trail = 'trail'
}

export type Hares_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Hares_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Hares_Set_Input>;
  /** filter the rows which have to be updated */
  where: Hares_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Hares_Var_Pop_Fields = {
  __typename?: 'hares_var_pop_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "hares" */
export type Hares_Var_Pop_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Hares_Var_Samp_Fields = {
  __typename?: 'hares_var_samp_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "hares" */
export type Hares_Var_Samp_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Hares_Variance_Fields = {
  __typename?: 'hares_variance_fields';
  hasher?: Maybe<Scalars['Float']>;
  trail?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "hares" */
export type Hares_Variance_Order_By = {
  hasher?: InputMaybe<Order_By>;
  trail?: InputMaybe<Order_By>;
};

/** columns and relationships of "hashers" */
export type Hashers = {
  __typename?: 'hashers';
  /** An array relationship */
  attendance: Array<Attendance>;
  /** An aggregate relationship */
  attendance_aggregate: Attendance_Aggregate;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  gm: Array<Kennels>;
  /** An aggregate relationship */
  gm_aggregate: Kennels_Aggregate;
  /** An array relationship */
  hares: Array<Hares>;
  /** An aggregate relationship */
  hares_aggregate: Hares_Aggregate;
  id: Scalars['Int'];
  login?: Maybe<Scalars['String']>;
  login_expires?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  management: Array<Management>;
  /** An aggregate relationship */
  management_aggregate: Management_Aggregate;
  name?: Maybe<Scalars['String']>;
};


/** columns and relationships of "hashers" */
export type HashersAttendanceArgs = {
  distinct_on?: InputMaybe<Array<Attendance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attendance_Order_By>>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};


/** columns and relationships of "hashers" */
export type HashersAttendance_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Attendance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attendance_Order_By>>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};


/** columns and relationships of "hashers" */
export type HashersGmArgs = {
  distinct_on?: InputMaybe<Array<Kennels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Kennels_Order_By>>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};


/** columns and relationships of "hashers" */
export type HashersGm_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Kennels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Kennels_Order_By>>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};


/** columns and relationships of "hashers" */
export type HashersHaresArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


/** columns and relationships of "hashers" */
export type HashersHares_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


/** columns and relationships of "hashers" */
export type HashersManagementArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


/** columns and relationships of "hashers" */
export type HashersManagement_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};

/** aggregated selection of "hashers" */
export type Hashers_Aggregate = {
  __typename?: 'hashers_aggregate';
  aggregate?: Maybe<Hashers_Aggregate_Fields>;
  nodes: Array<Hashers>;
};

/** aggregate fields of "hashers" */
export type Hashers_Aggregate_Fields = {
  __typename?: 'hashers_aggregate_fields';
  avg?: Maybe<Hashers_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Hashers_Max_Fields>;
  min?: Maybe<Hashers_Min_Fields>;
  stddev?: Maybe<Hashers_Stddev_Fields>;
  stddev_pop?: Maybe<Hashers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Hashers_Stddev_Samp_Fields>;
  sum?: Maybe<Hashers_Sum_Fields>;
  var_pop?: Maybe<Hashers_Var_Pop_Fields>;
  var_samp?: Maybe<Hashers_Var_Samp_Fields>;
  variance?: Maybe<Hashers_Variance_Fields>;
};


/** aggregate fields of "hashers" */
export type Hashers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Hashers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Hashers_Avg_Fields = {
  __typename?: 'hashers_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "hashers". All fields are combined with a logical 'AND'. */
export type Hashers_Bool_Exp = {
  _and?: InputMaybe<Array<Hashers_Bool_Exp>>;
  _not?: InputMaybe<Hashers_Bool_Exp>;
  _or?: InputMaybe<Array<Hashers_Bool_Exp>>;
  attendance?: InputMaybe<Attendance_Bool_Exp>;
  attendance_aggregate?: InputMaybe<Attendance_Aggregate_Bool_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  email_verified?: InputMaybe<Timestamptz_Comparison_Exp>;
  gm?: InputMaybe<Kennels_Bool_Exp>;
  gm_aggregate?: InputMaybe<Kennels_Aggregate_Bool_Exp>;
  hares?: InputMaybe<Hares_Bool_Exp>;
  hares_aggregate?: InputMaybe<Hares_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  login?: InputMaybe<String_Comparison_Exp>;
  login_expires?: InputMaybe<Timestamptz_Comparison_Exp>;
  management?: InputMaybe<Management_Bool_Exp>;
  management_aggregate?: InputMaybe<Management_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "hashers" */
export enum Hashers_Constraint {
  /** unique or primary key constraint on columns "email" */
  HashersEmailKey = 'hashers_email_key',
  /** unique or primary key constraint on columns "name" */
  HashersNameKey = 'hashers_name_key',
  /** unique or primary key constraint on columns "id" */
  HashersPkey = 'hashers_pkey'
}

/** input type for incrementing numeric columns in table "hashers" */
export type Hashers_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "hashers" */
export type Hashers_Insert_Input = {
  attendance?: InputMaybe<Attendance_Arr_Rel_Insert_Input>;
  email?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['timestamptz']>;
  gm?: InputMaybe<Kennels_Arr_Rel_Insert_Input>;
  hares?: InputMaybe<Hares_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<Scalars['String']>;
  login_expires?: InputMaybe<Scalars['timestamptz']>;
  management?: InputMaybe<Management_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Hashers_Max_Fields = {
  __typename?: 'hashers_max_fields';
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  login?: Maybe<Scalars['String']>;
  login_expires?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Hashers_Min_Fields = {
  __typename?: 'hashers_min_fields';
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  login?: Maybe<Scalars['String']>;
  login_expires?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "hashers" */
export type Hashers_Mutation_Response = {
  __typename?: 'hashers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Hashers>;
};

/** input type for inserting object relation for remote table "hashers" */
export type Hashers_Obj_Rel_Insert_Input = {
  data: Hashers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Hashers_On_Conflict>;
};

/** on_conflict condition type for table "hashers" */
export type Hashers_On_Conflict = {
  constraint: Hashers_Constraint;
  update_columns?: Array<Hashers_Update_Column>;
  where?: InputMaybe<Hashers_Bool_Exp>;
};

/** Ordering options when selecting data from "hashers". */
export type Hashers_Order_By = {
  attendance_aggregate?: InputMaybe<Attendance_Aggregate_Order_By>;
  email?: InputMaybe<Order_By>;
  email_verified?: InputMaybe<Order_By>;
  gm_aggregate?: InputMaybe<Kennels_Aggregate_Order_By>;
  hares_aggregate?: InputMaybe<Hares_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  login?: InputMaybe<Order_By>;
  login_expires?: InputMaybe<Order_By>;
  management_aggregate?: InputMaybe<Management_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: hashers */
export type Hashers_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "hashers" */
export enum Hashers_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  Id = 'id',
  /** column name */
  Login = 'login',
  /** column name */
  LoginExpires = 'login_expires',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "hashers" */
export type Hashers_Set_Input = {
  email?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<Scalars['String']>;
  login_expires?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Hashers_Stddev_Fields = {
  __typename?: 'hashers_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Hashers_Stddev_Pop_Fields = {
  __typename?: 'hashers_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Hashers_Stddev_Samp_Fields = {
  __typename?: 'hashers_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "hashers" */
export type Hashers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Hashers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Hashers_Stream_Cursor_Value_Input = {
  email?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<Scalars['String']>;
  login_expires?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Hashers_Sum_Fields = {
  __typename?: 'hashers_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "hashers" */
export enum Hashers_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  Id = 'id',
  /** column name */
  Login = 'login',
  /** column name */
  LoginExpires = 'login_expires',
  /** column name */
  Name = 'name'
}

export type Hashers_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Hashers_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Hashers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Hashers_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Hashers_Var_Pop_Fields = {
  __typename?: 'hashers_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Hashers_Var_Samp_Fields = {
  __typename?: 'hashers_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Hashers_Variance_Fields = {
  __typename?: 'hashers_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "kennels" */
export type Kennels = {
  __typename?: 'kennels';
  area?: Maybe<Scalars['String']>;
  dc_verify?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  frequency?: Maybe<Scalars['Int']>;
  /** An object relationship */
  gm?: Maybe<Hashers>;
  gm_email?: Maybe<Scalars['String']>;
  gm_verify?: Maybe<Scalars['String']>;
  google_calendar?: Maybe<Scalars['String']>;
  google_refresh?: Maybe<Scalars['String']>;
  google_token?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An array relationship */
  management: Array<Management>;
  /** An aggregate relationship */
  management_aggregate: Management_Aggregate;
  name?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['timestamptz']>;
  price?: Maybe<Scalars['float8']>;
  short_name?: Maybe<Scalars['String']>;
  timezone: Scalars['String'];
  /** An array relationship */
  trails: Array<Trails>;
  /** An aggregate relationship */
  trails_aggregate: Trails_Aggregate;
  web?: Maybe<Scalars['String']>;
};


/** columns and relationships of "kennels" */
export type KennelsManagementArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


/** columns and relationships of "kennels" */
export type KennelsManagement_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


/** columns and relationships of "kennels" */
export type KennelsTrailsArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};


/** columns and relationships of "kennels" */
export type KennelsTrails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};

/** aggregated selection of "kennels" */
export type Kennels_Aggregate = {
  __typename?: 'kennels_aggregate';
  aggregate?: Maybe<Kennels_Aggregate_Fields>;
  nodes: Array<Kennels>;
};

export type Kennels_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Kennels_Aggregate_Bool_Exp_Avg>;
  corr?: InputMaybe<Kennels_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Kennels_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Kennels_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Kennels_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Kennels_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Kennels_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Kennels_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Kennels_Aggregate_Bool_Exp_Var_Samp>;
};

export type Kennels_Aggregate_Bool_Exp_Avg = {
  arguments: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Corr = {
  arguments: Kennels_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Kennels_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Kennels_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Kennels_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Kennels_Aggregate_Bool_Exp_Max = {
  arguments: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Min = {
  arguments: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Sum = {
  arguments: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Kennels_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Kennels_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "kennels" */
export type Kennels_Aggregate_Fields = {
  __typename?: 'kennels_aggregate_fields';
  avg?: Maybe<Kennels_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Kennels_Max_Fields>;
  min?: Maybe<Kennels_Min_Fields>;
  stddev?: Maybe<Kennels_Stddev_Fields>;
  stddev_pop?: Maybe<Kennels_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Kennels_Stddev_Samp_Fields>;
  sum?: Maybe<Kennels_Sum_Fields>;
  var_pop?: Maybe<Kennels_Var_Pop_Fields>;
  var_samp?: Maybe<Kennels_Var_Samp_Fields>;
  variance?: Maybe<Kennels_Variance_Fields>;
};


/** aggregate fields of "kennels" */
export type Kennels_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Kennels_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "kennels" */
export type Kennels_Aggregate_Order_By = {
  avg?: InputMaybe<Kennels_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Kennels_Max_Order_By>;
  min?: InputMaybe<Kennels_Min_Order_By>;
  stddev?: InputMaybe<Kennels_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Kennels_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Kennels_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Kennels_Sum_Order_By>;
  var_pop?: InputMaybe<Kennels_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Kennels_Var_Samp_Order_By>;
  variance?: InputMaybe<Kennels_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "kennels" */
export type Kennels_Arr_Rel_Insert_Input = {
  data: Array<Kennels_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Kennels_On_Conflict>;
};

/** aggregate avg on columns */
export type Kennels_Avg_Fields = {
  __typename?: 'kennels_avg_fields';
  frequency?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "kennels" */
export type Kennels_Avg_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "kennels". All fields are combined with a logical 'AND'. */
export type Kennels_Bool_Exp = {
  _and?: InputMaybe<Array<Kennels_Bool_Exp>>;
  _not?: InputMaybe<Kennels_Bool_Exp>;
  _or?: InputMaybe<Array<Kennels_Bool_Exp>>;
  area?: InputMaybe<String_Comparison_Exp>;
  dc_verify?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  frequency?: InputMaybe<Int_Comparison_Exp>;
  gm?: InputMaybe<Hashers_Bool_Exp>;
  gm_email?: InputMaybe<String_Comparison_Exp>;
  gm_verify?: InputMaybe<String_Comparison_Exp>;
  google_calendar?: InputMaybe<String_Comparison_Exp>;
  google_refresh?: InputMaybe<String_Comparison_Exp>;
  google_token?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  management?: InputMaybe<Management_Bool_Exp>;
  management_aggregate?: InputMaybe<Management_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  next?: InputMaybe<Timestamptz_Comparison_Exp>;
  price?: InputMaybe<Float8_Comparison_Exp>;
  short_name?: InputMaybe<String_Comparison_Exp>;
  timezone?: InputMaybe<String_Comparison_Exp>;
  trails?: InputMaybe<Trails_Bool_Exp>;
  trails_aggregate?: InputMaybe<Trails_Aggregate_Bool_Exp>;
  web?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "kennels" */
export enum Kennels_Constraint {
  /** unique or primary key constraint on columns "id" */
  KennelsPkey = 'kennels_pkey'
}

/** input type for incrementing numeric columns in table "kennels" */
export type Kennels_Inc_Input = {
  frequency?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "kennels" */
export type Kennels_Insert_Input = {
  area?: InputMaybe<Scalars['String']>;
  dc_verify?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  frequency?: InputMaybe<Scalars['Int']>;
  gm?: InputMaybe<Hashers_Obj_Rel_Insert_Input>;
  gm_email?: InputMaybe<Scalars['String']>;
  gm_verify?: InputMaybe<Scalars['String']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  google_refresh?: InputMaybe<Scalars['String']>;
  google_token?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  management?: InputMaybe<Management_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  next?: InputMaybe<Scalars['timestamptz']>;
  price?: InputMaybe<Scalars['float8']>;
  short_name?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  trails?: InputMaybe<Trails_Arr_Rel_Insert_Input>;
  web?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Kennels_Max_Fields = {
  __typename?: 'kennels_max_fields';
  area?: Maybe<Scalars['String']>;
  dc_verify?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  frequency?: Maybe<Scalars['Int']>;
  gm_email?: Maybe<Scalars['String']>;
  gm_verify?: Maybe<Scalars['String']>;
  google_calendar?: Maybe<Scalars['String']>;
  google_refresh?: Maybe<Scalars['String']>;
  google_token?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['timestamptz']>;
  price?: Maybe<Scalars['float8']>;
  short_name?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "kennels" */
export type Kennels_Max_Order_By = {
  area?: InputMaybe<Order_By>;
  dc_verify?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  frequency?: InputMaybe<Order_By>;
  gm_email?: InputMaybe<Order_By>;
  gm_verify?: InputMaybe<Order_By>;
  google_calendar?: InputMaybe<Order_By>;
  google_refresh?: InputMaybe<Order_By>;
  google_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  next?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  short_name?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
  web?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Kennels_Min_Fields = {
  __typename?: 'kennels_min_fields';
  area?: Maybe<Scalars['String']>;
  dc_verify?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  frequency?: Maybe<Scalars['Int']>;
  gm_email?: Maybe<Scalars['String']>;
  gm_verify?: Maybe<Scalars['String']>;
  google_calendar?: Maybe<Scalars['String']>;
  google_refresh?: Maybe<Scalars['String']>;
  google_token?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['timestamptz']>;
  price?: Maybe<Scalars['float8']>;
  short_name?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "kennels" */
export type Kennels_Min_Order_By = {
  area?: InputMaybe<Order_By>;
  dc_verify?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  frequency?: InputMaybe<Order_By>;
  gm_email?: InputMaybe<Order_By>;
  gm_verify?: InputMaybe<Order_By>;
  google_calendar?: InputMaybe<Order_By>;
  google_refresh?: InputMaybe<Order_By>;
  google_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  next?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  short_name?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
  web?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "kennels" */
export type Kennels_Mutation_Response = {
  __typename?: 'kennels_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Kennels>;
};

/** input type for inserting object relation for remote table "kennels" */
export type Kennels_Obj_Rel_Insert_Input = {
  data: Kennels_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Kennels_On_Conflict>;
};

/** on_conflict condition type for table "kennels" */
export type Kennels_On_Conflict = {
  constraint: Kennels_Constraint;
  update_columns?: Array<Kennels_Update_Column>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};

/** Ordering options when selecting data from "kennels". */
export type Kennels_Order_By = {
  area?: InputMaybe<Order_By>;
  dc_verify?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  frequency?: InputMaybe<Order_By>;
  gm?: InputMaybe<Hashers_Order_By>;
  gm_email?: InputMaybe<Order_By>;
  gm_verify?: InputMaybe<Order_By>;
  google_calendar?: InputMaybe<Order_By>;
  google_refresh?: InputMaybe<Order_By>;
  google_token?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  management_aggregate?: InputMaybe<Management_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  next?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  short_name?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
  trails_aggregate?: InputMaybe<Trails_Aggregate_Order_By>;
  web?: InputMaybe<Order_By>;
};

/** primary key columns input for table: kennels */
export type Kennels_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "kennels" */
export enum Kennels_Select_Column {
  /** column name */
  Area = 'area',
  /** column name */
  DcVerify = 'dc_verify',
  /** column name */
  Description = 'description',
  /** column name */
  Frequency = 'frequency',
  /** column name */
  GmEmail = 'gm_email',
  /** column name */
  GmVerify = 'gm_verify',
  /** column name */
  GoogleCalendar = 'google_calendar',
  /** column name */
  GoogleRefresh = 'google_refresh',
  /** column name */
  GoogleToken = 'google_token',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Next = 'next',
  /** column name */
  Price = 'price',
  /** column name */
  ShortName = 'short_name',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  Web = 'web'
}

/** select "kennels_aggregate_bool_exp_avg_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** select "kennels_aggregate_bool_exp_corr_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** select "kennels_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** select "kennels_aggregate_bool_exp_max_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** select "kennels_aggregate_bool_exp_min_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** select "kennels_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** select "kennels_aggregate_bool_exp_sum_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** select "kennels_aggregate_bool_exp_var_samp_arguments_columns" columns of table "kennels" */
export enum Kennels_Select_Column_Kennels_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  Price = 'price'
}

/** input type for updating data in table "kennels" */
export type Kennels_Set_Input = {
  area?: InputMaybe<Scalars['String']>;
  dc_verify?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  frequency?: InputMaybe<Scalars['Int']>;
  gm_email?: InputMaybe<Scalars['String']>;
  gm_verify?: InputMaybe<Scalars['String']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  google_refresh?: InputMaybe<Scalars['String']>;
  google_token?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  next?: InputMaybe<Scalars['timestamptz']>;
  price?: InputMaybe<Scalars['float8']>;
  short_name?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  web?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Kennels_Stddev_Fields = {
  __typename?: 'kennels_stddev_fields';
  frequency?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "kennels" */
export type Kennels_Stddev_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Kennels_Stddev_Pop_Fields = {
  __typename?: 'kennels_stddev_pop_fields';
  frequency?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "kennels" */
export type Kennels_Stddev_Pop_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Kennels_Stddev_Samp_Fields = {
  __typename?: 'kennels_stddev_samp_fields';
  frequency?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "kennels" */
export type Kennels_Stddev_Samp_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "kennels" */
export type Kennels_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Kennels_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Kennels_Stream_Cursor_Value_Input = {
  area?: InputMaybe<Scalars['String']>;
  dc_verify?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  frequency?: InputMaybe<Scalars['Int']>;
  gm_email?: InputMaybe<Scalars['String']>;
  gm_verify?: InputMaybe<Scalars['String']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  google_refresh?: InputMaybe<Scalars['String']>;
  google_token?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  next?: InputMaybe<Scalars['timestamptz']>;
  price?: InputMaybe<Scalars['float8']>;
  short_name?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  web?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Kennels_Sum_Fields = {
  __typename?: 'kennels_sum_fields';
  frequency?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "kennels" */
export type Kennels_Sum_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** update columns of table "kennels" */
export enum Kennels_Update_Column {
  /** column name */
  Area = 'area',
  /** column name */
  DcVerify = 'dc_verify',
  /** column name */
  Description = 'description',
  /** column name */
  Frequency = 'frequency',
  /** column name */
  GmEmail = 'gm_email',
  /** column name */
  GmVerify = 'gm_verify',
  /** column name */
  GoogleCalendar = 'google_calendar',
  /** column name */
  GoogleRefresh = 'google_refresh',
  /** column name */
  GoogleToken = 'google_token',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Next = 'next',
  /** column name */
  Price = 'price',
  /** column name */
  ShortName = 'short_name',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  Web = 'web'
}

export type Kennels_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Kennels_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Kennels_Set_Input>;
  /** filter the rows which have to be updated */
  where: Kennels_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Kennels_Var_Pop_Fields = {
  __typename?: 'kennels_var_pop_fields';
  frequency?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "kennels" */
export type Kennels_Var_Pop_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Kennels_Var_Samp_Fields = {
  __typename?: 'kennels_var_samp_fields';
  frequency?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "kennels" */
export type Kennels_Var_Samp_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Kennels_Variance_Fields = {
  __typename?: 'kennels_variance_fields';
  frequency?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "kennels" */
export type Kennels_Variance_Order_By = {
  frequency?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
};

/** columns and relationships of "management" */
export type Management = {
  __typename?: 'management';
  hasher: Scalars['Int'];
  /** An object relationship */
  hasherInfo: Hashers;
  id: Scalars['Int'];
  kennel: Scalars['Int'];
  /** An object relationship */
  kennelInfo: Kennels;
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  role: Scalars['bit'];
  title?: Maybe<Scalars['String']>;
};


/** columns and relationships of "management" */
export type ManagementPermissionsArgs = {
  distinct_on?: InputMaybe<Array<Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permissions_Order_By>>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};


/** columns and relationships of "management" */
export type ManagementPermissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permissions_Order_By>>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};

/** aggregated selection of "management" */
export type Management_Aggregate = {
  __typename?: 'management_aggregate';
  aggregate?: Maybe<Management_Aggregate_Fields>;
  nodes: Array<Management>;
};

export type Management_Aggregate_Bool_Exp = {
  count?: InputMaybe<Management_Aggregate_Bool_Exp_Count>;
};

export type Management_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Management_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Management_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "management" */
export type Management_Aggregate_Fields = {
  __typename?: 'management_aggregate_fields';
  avg?: Maybe<Management_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Management_Max_Fields>;
  min?: Maybe<Management_Min_Fields>;
  stddev?: Maybe<Management_Stddev_Fields>;
  stddev_pop?: Maybe<Management_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Management_Stddev_Samp_Fields>;
  sum?: Maybe<Management_Sum_Fields>;
  var_pop?: Maybe<Management_Var_Pop_Fields>;
  var_samp?: Maybe<Management_Var_Samp_Fields>;
  variance?: Maybe<Management_Variance_Fields>;
};


/** aggregate fields of "management" */
export type Management_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Management_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "management" */
export type Management_Aggregate_Order_By = {
  avg?: InputMaybe<Management_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Management_Max_Order_By>;
  min?: InputMaybe<Management_Min_Order_By>;
  stddev?: InputMaybe<Management_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Management_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Management_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Management_Sum_Order_By>;
  var_pop?: InputMaybe<Management_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Management_Var_Samp_Order_By>;
  variance?: InputMaybe<Management_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "management" */
export type Management_Arr_Rel_Insert_Input = {
  data: Array<Management_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Management_On_Conflict>;
};

/** aggregate avg on columns */
export type Management_Avg_Fields = {
  __typename?: 'management_avg_fields';
  hasher?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "management" */
export type Management_Avg_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "management". All fields are combined with a logical 'AND'. */
export type Management_Bool_Exp = {
  _and?: InputMaybe<Array<Management_Bool_Exp>>;
  _not?: InputMaybe<Management_Bool_Exp>;
  _or?: InputMaybe<Array<Management_Bool_Exp>>;
  hasher?: InputMaybe<Int_Comparison_Exp>;
  hasherInfo?: InputMaybe<Hashers_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  kennel?: InputMaybe<Int_Comparison_Exp>;
  kennelInfo?: InputMaybe<Kennels_Bool_Exp>;
  permissions?: InputMaybe<Permissions_Bool_Exp>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Bool_Exp>;
  role?: InputMaybe<Bit_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "management" */
export enum Management_Constraint {
  /** unique or primary key constraint on columns "id" */
  ManagementPkey = 'management_pkey'
}

/** input type for incrementing numeric columns in table "management" */
export type Management_Inc_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "management" */
export type Management_Insert_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  hasherInfo?: InputMaybe<Hashers_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
  kennelInfo?: InputMaybe<Kennels_Obj_Rel_Insert_Input>;
  permissions?: InputMaybe<Permissions_Arr_Rel_Insert_Input>;
  role?: InputMaybe<Scalars['bit']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Management_Max_Fields = {
  __typename?: 'management_max_fields';
  hasher?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  kennel?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "management" */
export type Management_Max_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Management_Min_Fields = {
  __typename?: 'management_min_fields';
  hasher?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  kennel?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "management" */
export type Management_Min_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "management" */
export type Management_Mutation_Response = {
  __typename?: 'management_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Management>;
};

/** input type for inserting object relation for remote table "management" */
export type Management_Obj_Rel_Insert_Input = {
  data: Management_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Management_On_Conflict>;
};

/** on_conflict condition type for table "management" */
export type Management_On_Conflict = {
  constraint: Management_Constraint;
  update_columns?: Array<Management_Update_Column>;
  where?: InputMaybe<Management_Bool_Exp>;
};

/** Ordering options when selecting data from "management". */
export type Management_Order_By = {
  hasher?: InputMaybe<Order_By>;
  hasherInfo?: InputMaybe<Hashers_Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  kennelInfo?: InputMaybe<Kennels_Order_By>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Order_By>;
  role?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: management */
export type Management_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "management" */
export enum Management_Select_Column {
  /** column name */
  Hasher = 'hasher',
  /** column name */
  Id = 'id',
  /** column name */
  Kennel = 'kennel',
  /** column name */
  Role = 'role',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "management" */
export type Management_Set_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['bit']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Management_Stddev_Fields = {
  __typename?: 'management_stddev_fields';
  hasher?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "management" */
export type Management_Stddev_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Management_Stddev_Pop_Fields = {
  __typename?: 'management_stddev_pop_fields';
  hasher?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "management" */
export type Management_Stddev_Pop_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Management_Stddev_Samp_Fields = {
  __typename?: 'management_stddev_samp_fields';
  hasher?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "management" */
export type Management_Stddev_Samp_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "management" */
export type Management_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Management_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Management_Stream_Cursor_Value_Input = {
  hasher?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['bit']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Management_Sum_Fields = {
  __typename?: 'management_sum_fields';
  hasher?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  kennel?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "management" */
export type Management_Sum_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** update columns of table "management" */
export enum Management_Update_Column {
  /** column name */
  Hasher = 'hasher',
  /** column name */
  Id = 'id',
  /** column name */
  Kennel = 'kennel',
  /** column name */
  Role = 'role',
  /** column name */
  Title = 'title'
}

export type Management_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Management_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Management_Set_Input>;
  /** filter the rows which have to be updated */
  where: Management_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Management_Var_Pop_Fields = {
  __typename?: 'management_var_pop_fields';
  hasher?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "management" */
export type Management_Var_Pop_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Management_Var_Samp_Fields = {
  __typename?: 'management_var_samp_fields';
  hasher?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "management" */
export type Management_Var_Samp_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Management_Variance_Fields = {
  __typename?: 'management_variance_fields';
  hasher?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "management" */
export type Management_Variance_Order_By = {
  hasher?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "account_links" */
  delete_account_links?: Maybe<Account_Links_Mutation_Response>;
  /** delete single row from the table: "account_links" */
  delete_account_links_by_pk?: Maybe<Account_Links>;
  /** delete data from the table: "attendance" */
  delete_attendance?: Maybe<Attendance_Mutation_Response>;
  /** delete single row from the table: "attendance" */
  delete_attendance_by_pk?: Maybe<Attendance>;
  /** delete data from the table: "hares" */
  delete_hares?: Maybe<Hares_Mutation_Response>;
  /** delete data from the table: "hashers" */
  delete_hashers?: Maybe<Hashers_Mutation_Response>;
  /** delete single row from the table: "hashers" */
  delete_hashers_by_pk?: Maybe<Hashers>;
  /** delete data from the table: "kennels" */
  delete_kennels?: Maybe<Kennels_Mutation_Response>;
  /** delete single row from the table: "kennels" */
  delete_kennels_by_pk?: Maybe<Kennels>;
  /** delete data from the table: "management" */
  delete_management?: Maybe<Management_Mutation_Response>;
  /** delete single row from the table: "management" */
  delete_management_by_pk?: Maybe<Management>;
  /** delete data from the table: "permission_enum" */
  delete_permission_enum?: Maybe<Permission_Enum_Mutation_Response>;
  /** delete single row from the table: "permission_enum" */
  delete_permission_enum_by_pk?: Maybe<Permission_Enum>;
  /** delete data from the table: "permissions" */
  delete_permissions?: Maybe<Permissions_Mutation_Response>;
  /** delete single row from the table: "permissions" */
  delete_permissions_by_pk?: Maybe<Permissions>;
  /** delete data from the table: "sessions" */
  delete_sessions?: Maybe<Sessions_Mutation_Response>;
  /** delete single row from the table: "sessions" */
  delete_sessions_by_pk?: Maybe<Sessions>;
  /** delete data from the table: "trails" */
  delete_trails?: Maybe<Trails_Mutation_Response>;
  /** delete single row from the table: "trails" */
  delete_trails_by_pk?: Maybe<Trails>;
  /** insert data into the table: "account_links" */
  insert_account_links?: Maybe<Account_Links_Mutation_Response>;
  /** insert a single row into the table: "account_links" */
  insert_account_links_one?: Maybe<Account_Links>;
  /** insert data into the table: "attendance" */
  insert_attendance?: Maybe<Attendance_Mutation_Response>;
  /** insert a single row into the table: "attendance" */
  insert_attendance_one?: Maybe<Attendance>;
  /** insert data into the table: "hares" */
  insert_hares?: Maybe<Hares_Mutation_Response>;
  /** insert a single row into the table: "hares" */
  insert_hares_one?: Maybe<Hares>;
  /** insert data into the table: "hashers" */
  insert_hashers?: Maybe<Hashers_Mutation_Response>;
  /** insert a single row into the table: "hashers" */
  insert_hashers_one?: Maybe<Hashers>;
  /** insert data into the table: "kennels" */
  insert_kennels?: Maybe<Kennels_Mutation_Response>;
  /** insert a single row into the table: "kennels" */
  insert_kennels_one?: Maybe<Kennels>;
  /** insert data into the table: "management" */
  insert_management?: Maybe<Management_Mutation_Response>;
  /** insert a single row into the table: "management" */
  insert_management_one?: Maybe<Management>;
  /** insert data into the table: "permission_enum" */
  insert_permission_enum?: Maybe<Permission_Enum_Mutation_Response>;
  /** insert a single row into the table: "permission_enum" */
  insert_permission_enum_one?: Maybe<Permission_Enum>;
  /** insert data into the table: "permissions" */
  insert_permissions?: Maybe<Permissions_Mutation_Response>;
  /** insert a single row into the table: "permissions" */
  insert_permissions_one?: Maybe<Permissions>;
  /** insert data into the table: "sessions" */
  insert_sessions?: Maybe<Sessions_Mutation_Response>;
  /** insert a single row into the table: "sessions" */
  insert_sessions_one?: Maybe<Sessions>;
  /** insert data into the table: "trails" */
  insert_trails?: Maybe<Trails_Mutation_Response>;
  /** insert a single row into the table: "trails" */
  insert_trails_one?: Maybe<Trails>;
  /** update data of the table: "account_links" */
  update_account_links?: Maybe<Account_Links_Mutation_Response>;
  /** update single row of the table: "account_links" */
  update_account_links_by_pk?: Maybe<Account_Links>;
  /** update multiples rows of table: "account_links" */
  update_account_links_many?: Maybe<Array<Maybe<Account_Links_Mutation_Response>>>;
  /** update data of the table: "attendance" */
  update_attendance?: Maybe<Attendance_Mutation_Response>;
  /** update single row of the table: "attendance" */
  update_attendance_by_pk?: Maybe<Attendance>;
  /** update multiples rows of table: "attendance" */
  update_attendance_many?: Maybe<Array<Maybe<Attendance_Mutation_Response>>>;
  /** update data of the table: "hares" */
  update_hares?: Maybe<Hares_Mutation_Response>;
  /** update multiples rows of table: "hares" */
  update_hares_many?: Maybe<Array<Maybe<Hares_Mutation_Response>>>;
  /** update data of the table: "hashers" */
  update_hashers?: Maybe<Hashers_Mutation_Response>;
  /** update single row of the table: "hashers" */
  update_hashers_by_pk?: Maybe<Hashers>;
  /** update multiples rows of table: "hashers" */
  update_hashers_many?: Maybe<Array<Maybe<Hashers_Mutation_Response>>>;
  /** update data of the table: "kennels" */
  update_kennels?: Maybe<Kennels_Mutation_Response>;
  /** update single row of the table: "kennels" */
  update_kennels_by_pk?: Maybe<Kennels>;
  /** update multiples rows of table: "kennels" */
  update_kennels_many?: Maybe<Array<Maybe<Kennels_Mutation_Response>>>;
  /** update data of the table: "management" */
  update_management?: Maybe<Management_Mutation_Response>;
  /** update single row of the table: "management" */
  update_management_by_pk?: Maybe<Management>;
  /** update multiples rows of table: "management" */
  update_management_many?: Maybe<Array<Maybe<Management_Mutation_Response>>>;
  /** update data of the table: "permission_enum" */
  update_permission_enum?: Maybe<Permission_Enum_Mutation_Response>;
  /** update single row of the table: "permission_enum" */
  update_permission_enum_by_pk?: Maybe<Permission_Enum>;
  /** update multiples rows of table: "permission_enum" */
  update_permission_enum_many?: Maybe<Array<Maybe<Permission_Enum_Mutation_Response>>>;
  /** update data of the table: "permissions" */
  update_permissions?: Maybe<Permissions_Mutation_Response>;
  /** update single row of the table: "permissions" */
  update_permissions_by_pk?: Maybe<Permissions>;
  /** update multiples rows of table: "permissions" */
  update_permissions_many?: Maybe<Array<Maybe<Permissions_Mutation_Response>>>;
  /** update data of the table: "sessions" */
  update_sessions?: Maybe<Sessions_Mutation_Response>;
  /** update single row of the table: "sessions" */
  update_sessions_by_pk?: Maybe<Sessions>;
  /** update multiples rows of table: "sessions" */
  update_sessions_many?: Maybe<Array<Maybe<Sessions_Mutation_Response>>>;
  /** update data of the table: "trails" */
  update_trails?: Maybe<Trails_Mutation_Response>;
  /** update single row of the table: "trails" */
  update_trails_by_pk?: Maybe<Trails>;
  /** update multiples rows of table: "trails" */
  update_trails_many?: Maybe<Array<Maybe<Trails_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Account_LinksArgs = {
  where: Account_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Account_Links_By_PkArgs = {
  provider: Scalars['String'];
  user_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_AttendanceArgs = {
  where: Attendance_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Attendance_By_PkArgs = {
  hasher: Scalars['Int'];
  trail: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_HaresArgs = {
  where: Hares_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_HashersArgs = {
  where: Hashers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Hashers_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_KennelsArgs = {
  where: Kennels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Kennels_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ManagementArgs = {
  where: Management_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Management_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Permission_EnumArgs = {
  where: Permission_Enum_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Permission_Enum_By_PkArgs = {
  permission: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_PermissionsArgs = {
  where: Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Permissions_By_PkArgs = {
  permission: Permission_Enum_Enum;
  role: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
  where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_TrailsArgs = {
  where: Trails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Trails_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_Account_LinksArgs = {
  objects: Array<Account_Links_Insert_Input>;
  on_conflict?: InputMaybe<Account_Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Account_Links_OneArgs = {
  object: Account_Links_Insert_Input;
  on_conflict?: InputMaybe<Account_Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AttendanceArgs = {
  objects: Array<Attendance_Insert_Input>;
  on_conflict?: InputMaybe<Attendance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Attendance_OneArgs = {
  object: Attendance_Insert_Input;
  on_conflict?: InputMaybe<Attendance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_HaresArgs = {
  objects: Array<Hares_Insert_Input>;
  on_conflict?: InputMaybe<Hares_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Hares_OneArgs = {
  object: Hares_Insert_Input;
  on_conflict?: InputMaybe<Hares_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_HashersArgs = {
  objects: Array<Hashers_Insert_Input>;
  on_conflict?: InputMaybe<Hashers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Hashers_OneArgs = {
  object: Hashers_Insert_Input;
  on_conflict?: InputMaybe<Hashers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_KennelsArgs = {
  objects: Array<Kennels_Insert_Input>;
  on_conflict?: InputMaybe<Kennels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Kennels_OneArgs = {
  object: Kennels_Insert_Input;
  on_conflict?: InputMaybe<Kennels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ManagementArgs = {
  objects: Array<Management_Insert_Input>;
  on_conflict?: InputMaybe<Management_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Management_OneArgs = {
  object: Management_Insert_Input;
  on_conflict?: InputMaybe<Management_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Permission_EnumArgs = {
  objects: Array<Permission_Enum_Insert_Input>;
  on_conflict?: InputMaybe<Permission_Enum_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Permission_Enum_OneArgs = {
  object: Permission_Enum_Insert_Input;
  on_conflict?: InputMaybe<Permission_Enum_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PermissionsArgs = {
  objects: Array<Permissions_Insert_Input>;
  on_conflict?: InputMaybe<Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Permissions_OneArgs = {
  object: Permissions_Insert_Input;
  on_conflict?: InputMaybe<Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
  objects: Array<Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
  object: Sessions_Insert_Input;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TrailsArgs = {
  objects: Array<Trails_Insert_Input>;
  on_conflict?: InputMaybe<Trails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Trails_OneArgs = {
  object: Trails_Insert_Input;
  on_conflict?: InputMaybe<Trails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Account_LinksArgs = {
  _inc?: InputMaybe<Account_Links_Inc_Input>;
  _set?: InputMaybe<Account_Links_Set_Input>;
  where: Account_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Account_Links_By_PkArgs = {
  _inc?: InputMaybe<Account_Links_Inc_Input>;
  _set?: InputMaybe<Account_Links_Set_Input>;
  pk_columns: Account_Links_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Account_Links_ManyArgs = {
  updates: Array<Account_Links_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AttendanceArgs = {
  _inc?: InputMaybe<Attendance_Inc_Input>;
  _set?: InputMaybe<Attendance_Set_Input>;
  where: Attendance_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Attendance_By_PkArgs = {
  _inc?: InputMaybe<Attendance_Inc_Input>;
  _set?: InputMaybe<Attendance_Set_Input>;
  pk_columns: Attendance_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Attendance_ManyArgs = {
  updates: Array<Attendance_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_HaresArgs = {
  _inc?: InputMaybe<Hares_Inc_Input>;
  _set?: InputMaybe<Hares_Set_Input>;
  where: Hares_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Hares_ManyArgs = {
  updates: Array<Hares_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_HashersArgs = {
  _inc?: InputMaybe<Hashers_Inc_Input>;
  _set?: InputMaybe<Hashers_Set_Input>;
  where: Hashers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Hashers_By_PkArgs = {
  _inc?: InputMaybe<Hashers_Inc_Input>;
  _set?: InputMaybe<Hashers_Set_Input>;
  pk_columns: Hashers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Hashers_ManyArgs = {
  updates: Array<Hashers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_KennelsArgs = {
  _inc?: InputMaybe<Kennels_Inc_Input>;
  _set?: InputMaybe<Kennels_Set_Input>;
  where: Kennels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Kennels_By_PkArgs = {
  _inc?: InputMaybe<Kennels_Inc_Input>;
  _set?: InputMaybe<Kennels_Set_Input>;
  pk_columns: Kennels_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Kennels_ManyArgs = {
  updates: Array<Kennels_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ManagementArgs = {
  _inc?: InputMaybe<Management_Inc_Input>;
  _set?: InputMaybe<Management_Set_Input>;
  where: Management_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Management_By_PkArgs = {
  _inc?: InputMaybe<Management_Inc_Input>;
  _set?: InputMaybe<Management_Set_Input>;
  pk_columns: Management_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Management_ManyArgs = {
  updates: Array<Management_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Permission_EnumArgs = {
  _set?: InputMaybe<Permission_Enum_Set_Input>;
  where: Permission_Enum_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Permission_Enum_By_PkArgs = {
  _set?: InputMaybe<Permission_Enum_Set_Input>;
  pk_columns: Permission_Enum_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Permission_Enum_ManyArgs = {
  updates: Array<Permission_Enum_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PermissionsArgs = {
  _inc?: InputMaybe<Permissions_Inc_Input>;
  _set?: InputMaybe<Permissions_Set_Input>;
  where: Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Permissions_By_PkArgs = {
  _inc?: InputMaybe<Permissions_Inc_Input>;
  _set?: InputMaybe<Permissions_Set_Input>;
  pk_columns: Permissions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Permissions_ManyArgs = {
  updates: Array<Permissions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  pk_columns: Sessions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Sessions_ManyArgs = {
  updates: Array<Sessions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TrailsArgs = {
  _inc?: InputMaybe<Trails_Inc_Input>;
  _set?: InputMaybe<Trails_Set_Input>;
  where: Trails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Trails_By_PkArgs = {
  _inc?: InputMaybe<Trails_Inc_Input>;
  _set?: InputMaybe<Trails_Set_Input>;
  pk_columns: Trails_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Trails_ManyArgs = {
  updates: Array<Trails_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "permission_enum" */
export type Permission_Enum = {
  __typename?: 'permission_enum';
  description: Scalars['String'];
  permission: Scalars['String'];
};

/** aggregated selection of "permission_enum" */
export type Permission_Enum_Aggregate = {
  __typename?: 'permission_enum_aggregate';
  aggregate?: Maybe<Permission_Enum_Aggregate_Fields>;
  nodes: Array<Permission_Enum>;
};

/** aggregate fields of "permission_enum" */
export type Permission_Enum_Aggregate_Fields = {
  __typename?: 'permission_enum_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Permission_Enum_Max_Fields>;
  min?: Maybe<Permission_Enum_Min_Fields>;
};


/** aggregate fields of "permission_enum" */
export type Permission_Enum_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Permission_Enum_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "permission_enum". All fields are combined with a logical 'AND'. */
export type Permission_Enum_Bool_Exp = {
  _and?: InputMaybe<Array<Permission_Enum_Bool_Exp>>;
  _not?: InputMaybe<Permission_Enum_Bool_Exp>;
  _or?: InputMaybe<Array<Permission_Enum_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  permission?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "permission_enum" */
export enum Permission_Enum_Constraint {
  /** unique or primary key constraint on columns "permission" */
  PermissionEnumPkey = 'permission_enum_pkey'
}

export enum Permission_Enum_Enum {
  /** Ability to set hash fee, and to mark hashers as having paid for trail */
  Cash = 'cash',
  /** Mismanage: Add / Remove hashers from management roles */
  Mismanage = 'mismanage',
  /** Update Trails - Add / Edit / Delete trails regardless of who the hares are */
  UpdateTrails = 'update_trails'
}

/** Boolean expression to compare columns of type "permission_enum_enum". All fields are combined with logical 'AND'. */
export type Permission_Enum_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Permission_Enum_Enum>;
  _in?: InputMaybe<Array<Permission_Enum_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Permission_Enum_Enum>;
  _nin?: InputMaybe<Array<Permission_Enum_Enum>>;
};

/** input type for inserting data into table "permission_enum" */
export type Permission_Enum_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Permission_Enum_Max_Fields = {
  __typename?: 'permission_enum_max_fields';
  description?: Maybe<Scalars['String']>;
  permission?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Permission_Enum_Min_Fields = {
  __typename?: 'permission_enum_min_fields';
  description?: Maybe<Scalars['String']>;
  permission?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "permission_enum" */
export type Permission_Enum_Mutation_Response = {
  __typename?: 'permission_enum_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Permission_Enum>;
};

/** input type for inserting object relation for remote table "permission_enum" */
export type Permission_Enum_Obj_Rel_Insert_Input = {
  data: Permission_Enum_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Permission_Enum_On_Conflict>;
};

/** on_conflict condition type for table "permission_enum" */
export type Permission_Enum_On_Conflict = {
  constraint: Permission_Enum_Constraint;
  update_columns?: Array<Permission_Enum_Update_Column>;
  where?: InputMaybe<Permission_Enum_Bool_Exp>;
};

/** Ordering options when selecting data from "permission_enum". */
export type Permission_Enum_Order_By = {
  description?: InputMaybe<Order_By>;
  permission?: InputMaybe<Order_By>;
};

/** primary key columns input for table: permission_enum */
export type Permission_Enum_Pk_Columns_Input = {
  permission: Scalars['String'];
};

/** select columns of table "permission_enum" */
export enum Permission_Enum_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Permission = 'permission'
}

/** input type for updating data in table "permission_enum" */
export type Permission_Enum_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "permission_enum" */
export type Permission_Enum_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Permission_Enum_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Permission_Enum_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<Scalars['String']>;
};

/** update columns of table "permission_enum" */
export enum Permission_Enum_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Permission = 'permission'
}

export type Permission_Enum_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Permission_Enum_Set_Input>;
  /** filter the rows which have to be updated */
  where: Permission_Enum_Bool_Exp;
};

/** columns and relationships of "permissions" */
export type Permissions = {
  __typename?: 'permissions';
  permission: Permission_Enum_Enum;
  /** An object relationship */
  permissionInfo: Permission_Enum;
  role: Scalars['Int'];
  /** An object relationship */
  roleInfo: Management;
};

/** aggregated selection of "permissions" */
export type Permissions_Aggregate = {
  __typename?: 'permissions_aggregate';
  aggregate?: Maybe<Permissions_Aggregate_Fields>;
  nodes: Array<Permissions>;
};

export type Permissions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Permissions_Aggregate_Bool_Exp_Count>;
};

export type Permissions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Permissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Permissions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "permissions" */
export type Permissions_Aggregate_Fields = {
  __typename?: 'permissions_aggregate_fields';
  avg?: Maybe<Permissions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Permissions_Max_Fields>;
  min?: Maybe<Permissions_Min_Fields>;
  stddev?: Maybe<Permissions_Stddev_Fields>;
  stddev_pop?: Maybe<Permissions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Permissions_Stddev_Samp_Fields>;
  sum?: Maybe<Permissions_Sum_Fields>;
  var_pop?: Maybe<Permissions_Var_Pop_Fields>;
  var_samp?: Maybe<Permissions_Var_Samp_Fields>;
  variance?: Maybe<Permissions_Variance_Fields>;
};


/** aggregate fields of "permissions" */
export type Permissions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Permissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "permissions" */
export type Permissions_Aggregate_Order_By = {
  avg?: InputMaybe<Permissions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Permissions_Max_Order_By>;
  min?: InputMaybe<Permissions_Min_Order_By>;
  stddev?: InputMaybe<Permissions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Permissions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Permissions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Permissions_Sum_Order_By>;
  var_pop?: InputMaybe<Permissions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Permissions_Var_Samp_Order_By>;
  variance?: InputMaybe<Permissions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "permissions" */
export type Permissions_Arr_Rel_Insert_Input = {
  data: Array<Permissions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Permissions_On_Conflict>;
};

/** aggregate avg on columns */
export type Permissions_Avg_Fields = {
  __typename?: 'permissions_avg_fields';
  role?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "permissions" */
export type Permissions_Avg_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "permissions". All fields are combined with a logical 'AND'. */
export type Permissions_Bool_Exp = {
  _and?: InputMaybe<Array<Permissions_Bool_Exp>>;
  _not?: InputMaybe<Permissions_Bool_Exp>;
  _or?: InputMaybe<Array<Permissions_Bool_Exp>>;
  permission?: InputMaybe<Permission_Enum_Enum_Comparison_Exp>;
  permissionInfo?: InputMaybe<Permission_Enum_Bool_Exp>;
  role?: InputMaybe<Int_Comparison_Exp>;
  roleInfo?: InputMaybe<Management_Bool_Exp>;
};

/** unique or primary key constraints on table "permissions" */
export enum Permissions_Constraint {
  /** unique or primary key constraint on columns "role", "permission" */
  PermissionsPkey = 'permissions_pkey'
}

/** input type for incrementing numeric columns in table "permissions" */
export type Permissions_Inc_Input = {
  role?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "permissions" */
export type Permissions_Insert_Input = {
  permission?: InputMaybe<Permission_Enum_Enum>;
  permissionInfo?: InputMaybe<Permission_Enum_Obj_Rel_Insert_Input>;
  role?: InputMaybe<Scalars['Int']>;
  roleInfo?: InputMaybe<Management_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Permissions_Max_Fields = {
  __typename?: 'permissions_max_fields';
  role?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "permissions" */
export type Permissions_Max_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Permissions_Min_Fields = {
  __typename?: 'permissions_min_fields';
  role?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "permissions" */
export type Permissions_Min_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "permissions" */
export type Permissions_Mutation_Response = {
  __typename?: 'permissions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Permissions>;
};

/** on_conflict condition type for table "permissions" */
export type Permissions_On_Conflict = {
  constraint: Permissions_Constraint;
  update_columns?: Array<Permissions_Update_Column>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};

/** Ordering options when selecting data from "permissions". */
export type Permissions_Order_By = {
  permission?: InputMaybe<Order_By>;
  permissionInfo?: InputMaybe<Permission_Enum_Order_By>;
  role?: InputMaybe<Order_By>;
  roleInfo?: InputMaybe<Management_Order_By>;
};

/** primary key columns input for table: permissions */
export type Permissions_Pk_Columns_Input = {
  permission: Permission_Enum_Enum;
  role: Scalars['Int'];
};

/** select columns of table "permissions" */
export enum Permissions_Select_Column {
  /** column name */
  Permission = 'permission',
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "permissions" */
export type Permissions_Set_Input = {
  permission?: InputMaybe<Permission_Enum_Enum>;
  role?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Permissions_Stddev_Fields = {
  __typename?: 'permissions_stddev_fields';
  role?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "permissions" */
export type Permissions_Stddev_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Permissions_Stddev_Pop_Fields = {
  __typename?: 'permissions_stddev_pop_fields';
  role?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "permissions" */
export type Permissions_Stddev_Pop_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Permissions_Stddev_Samp_Fields = {
  __typename?: 'permissions_stddev_samp_fields';
  role?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "permissions" */
export type Permissions_Stddev_Samp_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "permissions" */
export type Permissions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Permissions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Permissions_Stream_Cursor_Value_Input = {
  permission?: InputMaybe<Permission_Enum_Enum>;
  role?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Permissions_Sum_Fields = {
  __typename?: 'permissions_sum_fields';
  role?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "permissions" */
export type Permissions_Sum_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** update columns of table "permissions" */
export enum Permissions_Update_Column {
  /** column name */
  Permission = 'permission',
  /** column name */
  Role = 'role'
}

export type Permissions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Permissions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Permissions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Permissions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Permissions_Var_Pop_Fields = {
  __typename?: 'permissions_var_pop_fields';
  role?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "permissions" */
export type Permissions_Var_Pop_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Permissions_Var_Samp_Fields = {
  __typename?: 'permissions_var_samp_fields';
  role?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "permissions" */
export type Permissions_Var_Samp_Order_By = {
  role?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Permissions_Variance_Fields = {
  __typename?: 'permissions_variance_fields';
  role?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "permissions" */
export type Permissions_Variance_Order_By = {
  role?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account_links" */
  account_links: Array<Account_Links>;
  /** fetch aggregated fields from the table: "account_links" */
  account_links_aggregate: Account_Links_Aggregate;
  /** fetch data from the table: "account_links" using primary key columns */
  account_links_by_pk?: Maybe<Account_Links>;
  /** An array relationship */
  attendance: Array<Attendance>;
  /** An aggregate relationship */
  attendance_aggregate: Attendance_Aggregate;
  /** fetch data from the table: "attendance" using primary key columns */
  attendance_by_pk?: Maybe<Attendance>;
  /** An array relationship */
  hares: Array<Hares>;
  /** An aggregate relationship */
  hares_aggregate: Hares_Aggregate;
  /** fetch data from the table: "hashers" */
  hashers: Array<Hashers>;
  /** fetch aggregated fields from the table: "hashers" */
  hashers_aggregate: Hashers_Aggregate;
  /** fetch data from the table: "hashers" using primary key columns */
  hashers_by_pk?: Maybe<Hashers>;
  /** fetch data from the table: "kennels" */
  kennels: Array<Kennels>;
  /** fetch aggregated fields from the table: "kennels" */
  kennels_aggregate: Kennels_Aggregate;
  /** fetch data from the table: "kennels" using primary key columns */
  kennels_by_pk?: Maybe<Kennels>;
  /** An array relationship */
  management: Array<Management>;
  /** An aggregate relationship */
  management_aggregate: Management_Aggregate;
  /** fetch data from the table: "management" using primary key columns */
  management_by_pk?: Maybe<Management>;
  /** fetch data from the table: "permission_enum" */
  permission_enum: Array<Permission_Enum>;
  /** fetch aggregated fields from the table: "permission_enum" */
  permission_enum_aggregate: Permission_Enum_Aggregate;
  /** fetch data from the table: "permission_enum" using primary key columns */
  permission_enum_by_pk?: Maybe<Permission_Enum>;
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  /** fetch data from the table: "permissions" using primary key columns */
  permissions_by_pk?: Maybe<Permissions>;
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>;
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** An array relationship */
  trails: Array<Trails>;
  /** An aggregate relationship */
  trails_aggregate: Trails_Aggregate;
  /** fetch data from the table: "trails" using primary key columns */
  trails_by_pk?: Maybe<Trails>;
};


export type Query_RootAccount_LinksArgs = {
  distinct_on?: InputMaybe<Array<Account_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Links_Order_By>>;
  where?: InputMaybe<Account_Links_Bool_Exp>;
};


export type Query_RootAccount_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Links_Order_By>>;
  where?: InputMaybe<Account_Links_Bool_Exp>;
};


export type Query_RootAccount_Links_By_PkArgs = {
  provider: Scalars['String'];
  user_id: Scalars['Int'];
};


export type Query_RootAttendanceArgs = {
  distinct_on?: InputMaybe<Array<Attendance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attendance_Order_By>>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};


export type Query_RootAttendance_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Attendance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attendance_Order_By>>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};


export type Query_RootAttendance_By_PkArgs = {
  hasher: Scalars['Int'];
  trail: Scalars['Int'];
};


export type Query_RootHaresArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


export type Query_RootHares_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


export type Query_RootHashersArgs = {
  distinct_on?: InputMaybe<Array<Hashers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hashers_Order_By>>;
  where?: InputMaybe<Hashers_Bool_Exp>;
};


export type Query_RootHashers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hashers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hashers_Order_By>>;
  where?: InputMaybe<Hashers_Bool_Exp>;
};


export type Query_RootHashers_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootKennelsArgs = {
  distinct_on?: InputMaybe<Array<Kennels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Kennels_Order_By>>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};


export type Query_RootKennels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Kennels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Kennels_Order_By>>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};


export type Query_RootKennels_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootManagementArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


export type Query_RootManagement_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


export type Query_RootManagement_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPermission_EnumArgs = {
  distinct_on?: InputMaybe<Array<Permission_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permission_Enum_Order_By>>;
  where?: InputMaybe<Permission_Enum_Bool_Exp>;
};


export type Query_RootPermission_Enum_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Permission_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permission_Enum_Order_By>>;
  where?: InputMaybe<Permission_Enum_Bool_Exp>;
};


export type Query_RootPermission_Enum_By_PkArgs = {
  permission: Scalars['String'];
};


export type Query_RootPermissionsArgs = {
  distinct_on?: InputMaybe<Array<Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permissions_Order_By>>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};


export type Query_RootPermissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permissions_Order_By>>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};


export type Query_RootPermissions_By_PkArgs = {
  permission: Permission_Enum_Enum;
  role: Scalars['Int'];
};


export type Query_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


export type Query_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


export type Query_RootSessions_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootTrailsArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};


export type Query_RootTrails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};


export type Query_RootTrails_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: 'sessions';
  expires: Scalars['timestamptz'];
  id: Scalars['String'];
  session_token: Scalars['String'];
  /** An object relationship */
  user: Hashers;
  user_id: Scalars['Int'];
};

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
  __typename?: 'sessions_aggregate';
  aggregate?: Maybe<Sessions_Aggregate_Fields>;
  nodes: Array<Sessions>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
  __typename?: 'sessions_aggregate_fields';
  avg?: Maybe<Sessions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Sessions_Max_Fields>;
  min?: Maybe<Sessions_Min_Fields>;
  stddev?: Maybe<Sessions_Stddev_Fields>;
  stddev_pop?: Maybe<Sessions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sessions_Stddev_Samp_Fields>;
  sum?: Maybe<Sessions_Sum_Fields>;
  var_pop?: Maybe<Sessions_Var_Pop_Fields>;
  var_samp?: Maybe<Sessions_Var_Samp_Fields>;
  variance?: Maybe<Sessions_Variance_Fields>;
};


/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
  __typename?: 'sessions_avg_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Sessions_Bool_Exp>>;
  _not?: InputMaybe<Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<Sessions_Bool_Exp>>;
  expires?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  session_token?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Hashers_Bool_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
  /** unique or primary key constraint on columns "id" */
  SessionsPkey = 'sessions_pkey'
}

/** input type for incrementing numeric columns in table "sessions" */
export type Sessions_Inc_Input = {
  user_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  session_token?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Hashers_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  __typename?: 'sessions_max_fields';
  expires?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  session_token?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Sessions_Min_Fields = {
  __typename?: 'sessions_min_fields';
  expires?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  session_token?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
  __typename?: 'sessions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Sessions>;
};

/** on_conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
  constraint: Sessions_Constraint;
  update_columns?: Array<Sessions_Update_Column>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
  expires?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  session_token?: InputMaybe<Order_By>;
  user?: InputMaybe<Hashers_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sessions */
export type Sessions_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'session_token',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  session_token?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
  __typename?: 'sessions_stddev_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
  __typename?: 'sessions_stddev_pop_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
  __typename?: 'sessions_stddev_samp_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "sessions" */
export type Sessions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sessions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sessions_Stream_Cursor_Value_Input = {
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  session_token?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
  __typename?: 'sessions_sum_fields';
  user_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'session_token',
  /** column name */
  UserId = 'user_id'
}

export type Sessions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Sessions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sessions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sessions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
  __typename?: 'sessions_var_pop_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
  __typename?: 'sessions_var_samp_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
  __typename?: 'sessions_variance_fields';
  user_id?: Maybe<Scalars['Float']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account_links" */
  account_links: Array<Account_Links>;
  /** fetch aggregated fields from the table: "account_links" */
  account_links_aggregate: Account_Links_Aggregate;
  /** fetch data from the table: "account_links" using primary key columns */
  account_links_by_pk?: Maybe<Account_Links>;
  /** fetch data from the table in a streaming manner: "account_links" */
  account_links_stream: Array<Account_Links>;
  /** An array relationship */
  attendance: Array<Attendance>;
  /** An aggregate relationship */
  attendance_aggregate: Attendance_Aggregate;
  /** fetch data from the table: "attendance" using primary key columns */
  attendance_by_pk?: Maybe<Attendance>;
  /** fetch data from the table in a streaming manner: "attendance" */
  attendance_stream: Array<Attendance>;
  /** An array relationship */
  hares: Array<Hares>;
  /** An aggregate relationship */
  hares_aggregate: Hares_Aggregate;
  /** fetch data from the table in a streaming manner: "hares" */
  hares_stream: Array<Hares>;
  /** fetch data from the table: "hashers" */
  hashers: Array<Hashers>;
  /** fetch aggregated fields from the table: "hashers" */
  hashers_aggregate: Hashers_Aggregate;
  /** fetch data from the table: "hashers" using primary key columns */
  hashers_by_pk?: Maybe<Hashers>;
  /** fetch data from the table in a streaming manner: "hashers" */
  hashers_stream: Array<Hashers>;
  /** fetch data from the table: "kennels" */
  kennels: Array<Kennels>;
  /** fetch aggregated fields from the table: "kennels" */
  kennels_aggregate: Kennels_Aggregate;
  /** fetch data from the table: "kennels" using primary key columns */
  kennels_by_pk?: Maybe<Kennels>;
  /** fetch data from the table in a streaming manner: "kennels" */
  kennels_stream: Array<Kennels>;
  /** An array relationship */
  management: Array<Management>;
  /** An aggregate relationship */
  management_aggregate: Management_Aggregate;
  /** fetch data from the table: "management" using primary key columns */
  management_by_pk?: Maybe<Management>;
  /** fetch data from the table in a streaming manner: "management" */
  management_stream: Array<Management>;
  /** fetch data from the table: "permission_enum" */
  permission_enum: Array<Permission_Enum>;
  /** fetch aggregated fields from the table: "permission_enum" */
  permission_enum_aggregate: Permission_Enum_Aggregate;
  /** fetch data from the table: "permission_enum" using primary key columns */
  permission_enum_by_pk?: Maybe<Permission_Enum>;
  /** fetch data from the table in a streaming manner: "permission_enum" */
  permission_enum_stream: Array<Permission_Enum>;
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  /** fetch data from the table: "permissions" using primary key columns */
  permissions_by_pk?: Maybe<Permissions>;
  /** fetch data from the table in a streaming manner: "permissions" */
  permissions_stream: Array<Permissions>;
  /** fetch data from the table: "sessions" */
  sessions: Array<Sessions>;
  /** fetch aggregated fields from the table: "sessions" */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table in a streaming manner: "sessions" */
  sessions_stream: Array<Sessions>;
  /** An array relationship */
  trails: Array<Trails>;
  /** An aggregate relationship */
  trails_aggregate: Trails_Aggregate;
  /** fetch data from the table: "trails" using primary key columns */
  trails_by_pk?: Maybe<Trails>;
  /** fetch data from the table in a streaming manner: "trails" */
  trails_stream: Array<Trails>;
};


export type Subscription_RootAccount_LinksArgs = {
  distinct_on?: InputMaybe<Array<Account_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Links_Order_By>>;
  where?: InputMaybe<Account_Links_Bool_Exp>;
};


export type Subscription_RootAccount_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Account_Links_Order_By>>;
  where?: InputMaybe<Account_Links_Bool_Exp>;
};


export type Subscription_RootAccount_Links_By_PkArgs = {
  provider: Scalars['String'];
  user_id: Scalars['Int'];
};


export type Subscription_RootAccount_Links_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Account_Links_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Links_Bool_Exp>;
};


export type Subscription_RootAttendanceArgs = {
  distinct_on?: InputMaybe<Array<Attendance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attendance_Order_By>>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};


export type Subscription_RootAttendance_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Attendance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attendance_Order_By>>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};


export type Subscription_RootAttendance_By_PkArgs = {
  hasher: Scalars['Int'];
  trail: Scalars['Int'];
};


export type Subscription_RootAttendance_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Attendance_Stream_Cursor_Input>>;
  where?: InputMaybe<Attendance_Bool_Exp>;
};


export type Subscription_RootHaresArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


export type Subscription_RootHares_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


export type Subscription_RootHares_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Hares_Stream_Cursor_Input>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


export type Subscription_RootHashersArgs = {
  distinct_on?: InputMaybe<Array<Hashers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hashers_Order_By>>;
  where?: InputMaybe<Hashers_Bool_Exp>;
};


export type Subscription_RootHashers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hashers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hashers_Order_By>>;
  where?: InputMaybe<Hashers_Bool_Exp>;
};


export type Subscription_RootHashers_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootHashers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Hashers_Stream_Cursor_Input>>;
  where?: InputMaybe<Hashers_Bool_Exp>;
};


export type Subscription_RootKennelsArgs = {
  distinct_on?: InputMaybe<Array<Kennels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Kennels_Order_By>>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};


export type Subscription_RootKennels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Kennels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Kennels_Order_By>>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};


export type Subscription_RootKennels_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootKennels_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Kennels_Stream_Cursor_Input>>;
  where?: InputMaybe<Kennels_Bool_Exp>;
};


export type Subscription_RootManagementArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


export type Subscription_RootManagement_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Management_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Management_Order_By>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


export type Subscription_RootManagement_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootManagement_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Management_Stream_Cursor_Input>>;
  where?: InputMaybe<Management_Bool_Exp>;
};


export type Subscription_RootPermission_EnumArgs = {
  distinct_on?: InputMaybe<Array<Permission_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permission_Enum_Order_By>>;
  where?: InputMaybe<Permission_Enum_Bool_Exp>;
};


export type Subscription_RootPermission_Enum_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Permission_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permission_Enum_Order_By>>;
  where?: InputMaybe<Permission_Enum_Bool_Exp>;
};


export type Subscription_RootPermission_Enum_By_PkArgs = {
  permission: Scalars['String'];
};


export type Subscription_RootPermission_Enum_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Permission_Enum_Stream_Cursor_Input>>;
  where?: InputMaybe<Permission_Enum_Bool_Exp>;
};


export type Subscription_RootPermissionsArgs = {
  distinct_on?: InputMaybe<Array<Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permissions_Order_By>>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};


export type Subscription_RootPermissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Permissions_Order_By>>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};


export type Subscription_RootPermissions_By_PkArgs = {
  permission: Permission_Enum_Enum;
  role: Scalars['Int'];
};


export type Subscription_RootPermissions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Permissions_Stream_Cursor_Input>>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};


export type Subscription_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


export type Subscription_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


export type Subscription_RootSessions_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootSessions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Sessions_Stream_Cursor_Input>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};


export type Subscription_RootTrailsArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};


export type Subscription_RootTrails_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};


export type Subscription_RootTrails_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootTrails_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Trails_Stream_Cursor_Input>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "trails" */
export type Trails = {
  __typename?: 'trails';
  calculated_number?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  directions?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['Int']>;
  /** An object relationship */
  draftFor?: Maybe<Trails>;
  /** An array relationship */
  drafts: Array<Trails>;
  /** An aggregate relationship */
  drafts_aggregate: Trails_Aggregate;
  gcal_dirty: Scalars['Boolean'];
  google_calendar?: Maybe<Scalars['String']>;
  /** An array relationship */
  hares: Array<Hares>;
  /** An aggregate relationship */
  hares_aggregate: Hares_Aggregate;
  id: Scalars['Int'];
  kennel: Scalars['Int'];
  /** An object relationship */
  kennelInfo: Kennels;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name: Scalars['String'];
  number?: Maybe<Scalars['Int']>;
  start: Scalars['timestamptz'];
  verification?: Maybe<Scalars['String']>;
};


/** columns and relationships of "trails" */
export type TrailsDraftsArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};


/** columns and relationships of "trails" */
export type TrailsDrafts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Trails_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Trails_Order_By>>;
  where?: InputMaybe<Trails_Bool_Exp>;
};


/** columns and relationships of "trails" */
export type TrailsHaresArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};


/** columns and relationships of "trails" */
export type TrailsHares_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hares_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Hares_Order_By>>;
  where?: InputMaybe<Hares_Bool_Exp>;
};

/** aggregated selection of "trails" */
export type Trails_Aggregate = {
  __typename?: 'trails_aggregate';
  aggregate?: Maybe<Trails_Aggregate_Fields>;
  nodes: Array<Trails>;
};

export type Trails_Aggregate_Bool_Exp = {
  avg?: InputMaybe<Trails_Aggregate_Bool_Exp_Avg>;
  bool_and?: InputMaybe<Trails_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Trails_Aggregate_Bool_Exp_Bool_Or>;
  corr?: InputMaybe<Trails_Aggregate_Bool_Exp_Corr>;
  count?: InputMaybe<Trails_Aggregate_Bool_Exp_Count>;
  covar_samp?: InputMaybe<Trails_Aggregate_Bool_Exp_Covar_Samp>;
  max?: InputMaybe<Trails_Aggregate_Bool_Exp_Max>;
  min?: InputMaybe<Trails_Aggregate_Bool_Exp_Min>;
  stddev_samp?: InputMaybe<Trails_Aggregate_Bool_Exp_Stddev_Samp>;
  sum?: InputMaybe<Trails_Aggregate_Bool_Exp_Sum>;
  var_samp?: InputMaybe<Trails_Aggregate_Bool_Exp_Var_Samp>;
};

export type Trails_Aggregate_Bool_Exp_Avg = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Bool_And = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Corr = {
  arguments: Trails_Aggregate_Bool_Exp_Corr_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Corr_Arguments = {
  X: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type Trails_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Trails_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: Trails_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type Trails_Aggregate_Bool_Exp_Max = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Min = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Sum = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

export type Trails_Aggregate_Bool_Exp_Var_Samp = {
  arguments: Trails_Select_Column_Trails_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Trails_Bool_Exp>;
  predicate: Float8_Comparison_Exp;
};

/** aggregate fields of "trails" */
export type Trails_Aggregate_Fields = {
  __typename?: 'trails_aggregate_fields';
  avg?: Maybe<Trails_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Trails_Max_Fields>;
  min?: Maybe<Trails_Min_Fields>;
  stddev?: Maybe<Trails_Stddev_Fields>;
  stddev_pop?: Maybe<Trails_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Trails_Stddev_Samp_Fields>;
  sum?: Maybe<Trails_Sum_Fields>;
  var_pop?: Maybe<Trails_Var_Pop_Fields>;
  var_samp?: Maybe<Trails_Var_Samp_Fields>;
  variance?: Maybe<Trails_Variance_Fields>;
};


/** aggregate fields of "trails" */
export type Trails_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Trails_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "trails" */
export type Trails_Aggregate_Order_By = {
  avg?: InputMaybe<Trails_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Trails_Max_Order_By>;
  min?: InputMaybe<Trails_Min_Order_By>;
  stddev?: InputMaybe<Trails_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Trails_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Trails_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Trails_Sum_Order_By>;
  var_pop?: InputMaybe<Trails_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Trails_Var_Samp_Order_By>;
  variance?: InputMaybe<Trails_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "trails" */
export type Trails_Arr_Rel_Insert_Input = {
  data: Array<Trails_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Trails_On_Conflict>;
};

/** aggregate avg on columns */
export type Trails_Avg_Fields = {
  __typename?: 'trails_avg_fields';
  calculated_number?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "trails" */
export type Trails_Avg_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "trails". All fields are combined with a logical 'AND'. */
export type Trails_Bool_Exp = {
  _and?: InputMaybe<Array<Trails_Bool_Exp>>;
  _not?: InputMaybe<Trails_Bool_Exp>;
  _or?: InputMaybe<Array<Trails_Bool_Exp>>;
  calculated_number?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  directions?: InputMaybe<String_Comparison_Exp>;
  draft?: InputMaybe<Int_Comparison_Exp>;
  draftFor?: InputMaybe<Trails_Bool_Exp>;
  drafts?: InputMaybe<Trails_Bool_Exp>;
  drafts_aggregate?: InputMaybe<Trails_Aggregate_Bool_Exp>;
  gcal_dirty?: InputMaybe<Boolean_Comparison_Exp>;
  google_calendar?: InputMaybe<String_Comparison_Exp>;
  hares?: InputMaybe<Hares_Bool_Exp>;
  hares_aggregate?: InputMaybe<Hares_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  kennel?: InputMaybe<Int_Comparison_Exp>;
  kennelInfo?: InputMaybe<Kennels_Bool_Exp>;
  latitude?: InputMaybe<Float8_Comparison_Exp>;
  longitude?: InputMaybe<Float8_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  number?: InputMaybe<Int_Comparison_Exp>;
  start?: InputMaybe<Timestamptz_Comparison_Exp>;
  verification?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "trails" */
export enum Trails_Constraint {
  /** unique or primary key constraint on columns "id" */
  TrailsPkey = 'trails_pkey'
}

/** input type for incrementing numeric columns in table "trails" */
export type Trails_Inc_Input = {
  calculated_number?: InputMaybe<Scalars['Int']>;
  draft?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['float8']>;
  longitude?: InputMaybe<Scalars['float8']>;
  number?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "trails" */
export type Trails_Insert_Input = {
  calculated_number?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Int']>;
  draftFor?: InputMaybe<Trails_Obj_Rel_Insert_Input>;
  drafts?: InputMaybe<Trails_Arr_Rel_Insert_Input>;
  gcal_dirty?: InputMaybe<Scalars['Boolean']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  hares?: InputMaybe<Hares_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
  kennelInfo?: InputMaybe<Kennels_Obj_Rel_Insert_Input>;
  latitude?: InputMaybe<Scalars['float8']>;
  longitude?: InputMaybe<Scalars['float8']>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['timestamptz']>;
  verification?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Trails_Max_Fields = {
  __typename?: 'trails_max_fields';
  calculated_number?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  directions?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['Int']>;
  google_calendar?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  kennel?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['timestamptz']>;
  verification?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "trails" */
export type Trails_Max_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  directions?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  google_calendar?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  start?: InputMaybe<Order_By>;
  verification?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Trails_Min_Fields = {
  __typename?: 'trails_min_fields';
  calculated_number?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  directions?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['Int']>;
  google_calendar?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  kennel?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['timestamptz']>;
  verification?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "trails" */
export type Trails_Min_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  directions?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  google_calendar?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  start?: InputMaybe<Order_By>;
  verification?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "trails" */
export type Trails_Mutation_Response = {
  __typename?: 'trails_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Trails>;
};

/** input type for inserting object relation for remote table "trails" */
export type Trails_Obj_Rel_Insert_Input = {
  data: Trails_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Trails_On_Conflict>;
};

/** on_conflict condition type for table "trails" */
export type Trails_On_Conflict = {
  constraint: Trails_Constraint;
  update_columns?: Array<Trails_Update_Column>;
  where?: InputMaybe<Trails_Bool_Exp>;
};

/** Ordering options when selecting data from "trails". */
export type Trails_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  directions?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  draftFor?: InputMaybe<Trails_Order_By>;
  drafts_aggregate?: InputMaybe<Trails_Aggregate_Order_By>;
  gcal_dirty?: InputMaybe<Order_By>;
  google_calendar?: InputMaybe<Order_By>;
  hares_aggregate?: InputMaybe<Hares_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  kennelInfo?: InputMaybe<Kennels_Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  start?: InputMaybe<Order_By>;
  verification?: InputMaybe<Order_By>;
};

/** primary key columns input for table: trails */
export type Trails_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "trails" */
export enum Trails_Select_Column {
  /** column name */
  CalculatedNumber = 'calculated_number',
  /** column name */
  Description = 'description',
  /** column name */
  Directions = 'directions',
  /** column name */
  Draft = 'draft',
  /** column name */
  GcalDirty = 'gcal_dirty',
  /** column name */
  GoogleCalendar = 'google_calendar',
  /** column name */
  Id = 'id',
  /** column name */
  Kennel = 'kennel',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  Number = 'number',
  /** column name */
  Start = 'start',
  /** column name */
  Verification = 'verification'
}

/** select "trails_aggregate_bool_exp_avg_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** select "trails_aggregate_bool_exp_bool_and_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  GcalDirty = 'gcal_dirty'
}

/** select "trails_aggregate_bool_exp_bool_or_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  GcalDirty = 'gcal_dirty'
}

/** select "trails_aggregate_bool_exp_corr_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** select "trails_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** select "trails_aggregate_bool_exp_max_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** select "trails_aggregate_bool_exp_min_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** select "trails_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** select "trails_aggregate_bool_exp_sum_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** select "trails_aggregate_bool_exp_var_samp_arguments_columns" columns of table "trails" */
export enum Trails_Select_Column_Trails_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude'
}

/** input type for updating data in table "trails" */
export type Trails_Set_Input = {
  calculated_number?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Int']>;
  gcal_dirty?: InputMaybe<Scalars['Boolean']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['float8']>;
  longitude?: InputMaybe<Scalars['float8']>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['timestamptz']>;
  verification?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Trails_Stddev_Fields = {
  __typename?: 'trails_stddev_fields';
  calculated_number?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "trails" */
export type Trails_Stddev_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Trails_Stddev_Pop_Fields = {
  __typename?: 'trails_stddev_pop_fields';
  calculated_number?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "trails" */
export type Trails_Stddev_Pop_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Trails_Stddev_Samp_Fields = {
  __typename?: 'trails_stddev_samp_fields';
  calculated_number?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "trails" */
export type Trails_Stddev_Samp_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "trails" */
export type Trails_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Trails_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Trails_Stream_Cursor_Value_Input = {
  calculated_number?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Int']>;
  gcal_dirty?: InputMaybe<Scalars['Boolean']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  kennel?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['float8']>;
  longitude?: InputMaybe<Scalars['float8']>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['timestamptz']>;
  verification?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Trails_Sum_Fields = {
  __typename?: 'trails_sum_fields';
  calculated_number?: Maybe<Scalars['Int']>;
  draft?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  kennel?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  number?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "trails" */
export type Trails_Sum_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** update columns of table "trails" */
export enum Trails_Update_Column {
  /** column name */
  CalculatedNumber = 'calculated_number',
  /** column name */
  Description = 'description',
  /** column name */
  Directions = 'directions',
  /** column name */
  Draft = 'draft',
  /** column name */
  GcalDirty = 'gcal_dirty',
  /** column name */
  GoogleCalendar = 'google_calendar',
  /** column name */
  Id = 'id',
  /** column name */
  Kennel = 'kennel',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  Number = 'number',
  /** column name */
  Start = 'start',
  /** column name */
  Verification = 'verification'
}

export type Trails_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Trails_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Trails_Set_Input>;
  /** filter the rows which have to be updated */
  where: Trails_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Trails_Var_Pop_Fields = {
  __typename?: 'trails_var_pop_fields';
  calculated_number?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "trails" */
export type Trails_Var_Pop_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Trails_Var_Samp_Fields = {
  __typename?: 'trails_var_samp_fields';
  calculated_number?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "trails" */
export type Trails_Var_Samp_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Trails_Variance_Fields = {
  __typename?: 'trails_variance_fields';
  calculated_number?: Maybe<Scalars['Float']>;
  draft?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  kennel?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  number?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "trails" */
export type Trails_Variance_Order_By = {
  calculated_number?: InputMaybe<Order_By>;
  draft?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kennel?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

export type GqlUpdateAccessTokenMutationVariables = Exact<{
  accessToken?: InputMaybe<Scalars['String']>;
  urt?: InputMaybe<Scalars['String']>;
  uat?: InputMaybe<Scalars['String']>;
}>;


export type GqlUpdateAccessTokenMutation = { __typename?: 'mutation_root', update_kennels?: { __typename?: 'kennels_mutation_response', affected_rows: number } | null };

export type GqlAddRolePermissionMutationVariables = Exact<{
  role?: InputMaybe<Scalars['Int']>;
  permission?: InputMaybe<Permission_Enum_Enum>;
}>;


export type GqlAddRolePermissionMutation = { __typename?: 'mutation_root', insert_permissions?: { __typename?: 'permissions_mutation_response', affected_rows: number } | null };

export type GqlAddMismanagementMutationVariables = Exact<{
  hasher?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  kennelID?: InputMaybe<Scalars['Int']>;
}>;


export type GqlAddMismanagementMutation = { __typename?: 'mutation_root', insert_management?: { __typename?: 'management_mutation_response', affected_rows: number } | null };

export type GqlUpdateRoleHasherMutationVariables = Exact<{
  role?: InputMaybe<Scalars['Int']>;
  kennelID?: InputMaybe<Scalars['Int']>;
  hasher?: InputMaybe<Scalars['Int']>;
}>;


export type GqlUpdateRoleHasherMutation = { __typename?: 'mutation_root', update_management?: { __typename?: 'management_mutation_response', affected_rows: number } | null };

export type GqlDeleteRoleMutationVariables = Exact<{
  role?: InputMaybe<Scalars['Int']>;
  kennelID?: InputMaybe<Scalars['Int']>;
}>;


export type GqlDeleteRoleMutation = { __typename?: 'mutation_root', delete_management?: { __typename?: 'management_mutation_response', affected_rows: number } | null };

export type GqlUpdateSelfDraftMutationVariables = Exact<{
  trailId: Scalars['Int'];
}>;


export type GqlUpdateSelfDraftMutation = { __typename?: 'mutation_root', update_trails_by_pk?: { __typename?: 'trails', id: number } | null };

export type GqlDeleteRolePermissionMutationVariables = Exact<{
  role?: InputMaybe<Scalars['Int']>;
  permission?: InputMaybe<Permission_Enum_Enum>;
}>;


export type GqlDeleteRolePermissionMutation = { __typename?: 'mutation_root', delete_permissions?: { __typename?: 'permissions_mutation_response', affected_rows: number } | null };

export type GqlSetCalendarIdMutationVariables = Exact<{
  cal?: InputMaybe<Scalars['String']>;
  kennelID?: InputMaybe<Scalars['Int']>;
  userEmail?: InputMaybe<Scalars['String']>;
}>;


export type GqlSetCalendarIdMutation = { __typename?: 'mutation_root', update_kennels?: { __typename?: 'kennels_mutation_response', returning: Array<{ __typename?: 'kennels', id: number }> } | null };

export type GqlClearDraftMutationMutationVariables = Exact<{
  trailId: Scalars['Int'];
}>;


export type GqlClearDraftMutationMutation = { __typename?: 'mutation_root', update_trails_by_pk?: { __typename?: 'trails', id: number } | null };

export type GqlInsertTrailMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  calculated_number?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Int']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  hares: Array<Hares_Insert_Input> | Hares_Insert_Input;
  kennel?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['float8']>;
  longitude?: InputMaybe<Scalars['float8']>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['timestamptz']>;
}>;


export type GqlInsertTrailMutation = { __typename?: 'mutation_root', insert_trails_one?: { __typename?: 'trails', id: number } | null };

export type GqlInsertTrailDraftMutationVariables = Exact<{
  calculated_number?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  draft?: InputMaybe<Scalars['Int']>;
  google_calendar?: InputMaybe<Scalars['String']>;
  hares: Array<Hares_Insert_Input> | Hares_Insert_Input;
  kennel?: InputMaybe<Scalars['Int']>;
  latitude?: InputMaybe<Scalars['float8']>;
  longitude?: InputMaybe<Scalars['float8']>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['timestamptz']>;
}>;


export type GqlInsertTrailDraftMutation = { __typename?: 'mutation_root', insert_trails_one?: { __typename?: 'trails', id: number } | null };

export type GqlUpdateGoogleTokensMutationVariables = Exact<{
  accessToken?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  kennelID?: InputMaybe<Scalars['Int']>;
}>;


export type GqlUpdateGoogleTokensMutation = { __typename?: 'mutation_root', update_kennels?: { __typename?: 'kennels_mutation_response', affected_rows: number } | null };

export type GqlUpdateAttendanceMutationVariables = Exact<{
  attended?: InputMaybe<Scalars['Boolean']>;
  hasher?: InputMaybe<Scalars['Int']>;
  trail?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
}>;


export type GqlUpdateAttendanceMutation = { __typename?: 'mutation_root', insert_attendance_one?: { __typename?: 'attendance', attended?: boolean | null } | null };

export type GqlClearCalendarInfoFromTrailMutationVariables = Exact<{
  trailIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GqlClearCalendarInfoFromTrailMutation = { __typename?: 'mutation_root', update_trails?: { __typename?: 'trails_mutation_response', affected_rows: number } | null };

export type GqlMarkCleanMutationVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlMarkCleanMutation = { __typename?: 'mutation_root', update_trails?: { __typename?: 'trails_mutation_response', affected_rows: number } | null };

export type GqlUpdateKennelMutationVariables = Exact<{
  kennelID: Scalars['Int'];
  frequency?: InputMaybe<Scalars['Int']>;
  area?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  next?: InputMaybe<Scalars['timestamptz']>;
  price?: InputMaybe<Scalars['float8']>;
  short?: InputMaybe<Scalars['String']>;
  web?: InputMaybe<Scalars['String']>;
}>;


export type GqlUpdateKennelMutation = { __typename?: 'mutation_root', update_kennels_by_pk?: { __typename?: 'kennels', id: number } | null };

export type GqlUpdateTrailGidMutationVariables = Exact<{
  gid?: InputMaybe<Scalars['String']>;
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlUpdateTrailGidMutation = { __typename?: 'mutation_root', update_trails?: { __typename?: 'trails_mutation_response', affected_rows: number } | null };

export type GqlInsertHasherMutationVariables = Exact<{
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
}>;


export type GqlInsertHasherMutation = { __typename?: 'mutation_root', insert_hashers?: { __typename?: 'hashers_mutation_response', returning: Array<{ __typename?: 'hashers', name?: string | null, id: number }> } | null };

export type GqlDeleteTrailMutationVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlDeleteTrailMutation = { __typename?: 'mutation_root', delete_trails?: { __typename?: 'trails_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'trails', google_calendar?: string | null, kennelInfo: { __typename?: 'kennels', google_refresh?: string | null, google_token?: string | null, google_calendar?: string | null } }> } | null };

export type GqlFixTrailNumberInfoQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlFixTrailNumberInfoQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', number?: number | null, calculated_number?: number | null, id: number, start: any, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', id: number } }> }> };

export type GqlUpdateCalculatedNumberMutationVariables = Exact<{
  id: Scalars['Int'];
  calculated_number?: InputMaybe<Scalars['Int']>;
}>;


export type GqlUpdateCalculatedNumberMutation = { __typename?: 'mutation_root', update_trails_by_pk?: { __typename?: 'trails', id: number } | null };

export type GqlMoveAttendanceMutationVariables = Exact<{
  from?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['Int']>;
}>;


export type GqlMoveAttendanceMutation = { __typename?: 'mutation_root', update_attendance?: { __typename?: 'attendance_mutation_response', affected_rows: number } | null };

export type GqlAcceptDraftMutationMutationVariables = Exact<{
  from: Scalars['Int'];
  to: Scalars['Int'];
}>;


export type GqlAcceptDraftMutationMutation = { __typename?: 'mutation_root', update_trails_by_pk?: { __typename?: 'trails', id: number } | null };

export type GqlCreateVerificationTokenMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
  expires?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
}>;


export type GqlCreateVerificationTokenMutation = { __typename?: 'mutation_root', update_hashers?: { __typename?: 'hashers_mutation_response', returning: Array<{ __typename?: 'hashers', id: number }> } | null };

export type GqlUseVerificationTokenMutationVariables = Exact<{
  identifier?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['timestamptz']>;
}>;


export type GqlUseVerificationTokenMutation = { __typename?: 'mutation_root', update_hashers?: { __typename?: 'hashers_mutation_response', returning: Array<{ __typename?: 'hashers', login_expires?: any | null }> } | null };

export type GqlDeleteSessionMutationVariables = Exact<{
  sessionToken?: InputMaybe<Scalars['String']>;
}>;


export type GqlDeleteSessionMutation = { __typename?: 'mutation_root', delete_sessions?: { __typename?: 'sessions_mutation_response', returning: Array<{ __typename?: 'sessions', expires: any, id: string, user_id: number }> } | null };

export type GqlUpdateUserMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  emailVerified?: InputMaybe<Scalars['timestamptz']>;
}>;


export type GqlUpdateUserMutation = { __typename?: 'mutation_root', update_hashers?: { __typename?: 'hashers_mutation_response', returning: Array<{ __typename?: 'hashers', email?: string | null, email_verified?: any | null, id: number, name?: string | null }> } | null };

export type GqlCreateSessionMutationVariables = Exact<{
  sessionToken?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  expires?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
}>;


export type GqlCreateSessionMutation = { __typename?: 'mutation_root', insert_sessions_one?: { __typename?: 'sessions', id: string } | null };

export type GqlCreateUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type GqlCreateUserMutation = { __typename?: 'mutation_root', insert_hashers_one?: { __typename?: 'hashers', id: number } | null };

export type GqlLinkAccountMutationVariables = Exact<{
  provider?: InputMaybe<Scalars['String']>;
  providerAccountId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlLinkAccountMutation = { __typename?: 'mutation_root', insert_account_links_one?: { __typename?: 'account_links', user_id: number } | null };

export type GqlUpdateCalendarTokenMutationVariables = Exact<{
  calendar?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  accessToken?: InputMaybe<Scalars['String']>;
  kennelID?: InputMaybe<Scalars['Int']>;
  userEmail?: InputMaybe<Scalars['String']>;
}>;


export type GqlUpdateCalendarTokenMutation = { __typename?: 'mutation_root', update_kennels?: { __typename?: 'kennels_mutation_response', returning: Array<{ __typename?: 'kennels', id: number }> } | null };

export type GqlUpdateNoteMutationVariables = Exact<{
  note?: InputMaybe<Scalars['String']>;
  trailId?: InputMaybe<Scalars['Int']>;
  hasherId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlUpdateNoteMutation = { __typename?: 'mutation_root', update_attendance?: { __typename?: 'attendance_mutation_response', affected_rows: number } | null };

export type GqlUpdatePaidMutationVariables = Exact<{
  hasherId?: InputMaybe<Scalars['Int']>;
  trailId?: InputMaybe<Scalars['Int']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  attended?: InputMaybe<Scalars['Boolean']>;
}>;


export type GqlUpdatePaidMutation = { __typename?: 'mutation_root', insert_attendance?: { __typename?: 'attendance_mutation_response', affected_rows: number } | null };

export type InsertTrailsMutationVariables = Exact<{
  trails?: InputMaybe<Array<Trails_Insert_Input> | Trails_Insert_Input>;
}>;


export type InsertTrailsMutation = { __typename?: 'mutation_root', insert_trails?: { __typename?: 'trails_mutation_response', affected_rows: number } | null };

export type UpdateKennelNextMutationVariables = Exact<{
  kennelId: Scalars['Int'];
  next: Scalars['timestamptz'];
}>;


export type UpdateKennelNextMutation = { __typename?: 'mutation_root', update_kennels_by_pk?: { __typename?: 'kennels', id: number } | null };

export type GqlHareRankQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlHareRankQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', name?: string | null, id: number, hares_aggregate: { __typename?: 'hares_aggregate', aggregate?: { __typename?: 'hares_aggregate_fields', count: number } | null } }> };

export type GqlGetKennelPageKennelFragment = { __typename?: 'kennels', short_name?: string | null, name?: string | null, id: number, description?: string | null, area?: string | null, web?: string | null, price?: any | null, frequency?: number | null, next?: any | null, google_calendar?: string | null, trails: Array<{ __typename?: 'trails', calculated_number?: number | null, id: number, start: any, name: string, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> }> };

export type GqlGetKennelPageQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['timestamptz']>;
}>;


export type GqlGetKennelPageQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', short_name?: string | null, name?: string | null, id: number, description?: string | null, area?: string | null, web?: string | null, price?: any | null, frequency?: number | null, next?: any | null, google_calendar?: string | null, trails: Array<{ __typename?: 'trails', calculated_number?: number | null, id: number, start: any, name: string, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> }> }> };

export type GqlMismanagementViewQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlMismanagementViewQuery = { __typename?: 'query_root', management: Array<{ __typename?: 'management', title?: string | null, hasherInfo: { __typename?: 'hashers', name?: string | null, id: number } }> };

export type GqlFeedPageQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  kennels?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GqlFeedPageQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', name: string, id: number, start: any, kennelInfo: { __typename?: 'kennels', short_name?: string | null } }> };

export type GqlGetRefreshTokenQueryVariables = Exact<{
  accessToken?: InputMaybe<Scalars['String']>;
}>;


export type GqlGetRefreshTokenQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', google_refresh?: string | null }> };

export type GqlHasherFromEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type GqlHasherFromEmailQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', id: number, name?: string | null }> };

export type GqlHareCheckFragmentFragment = { __typename?: 'trails', kennel: number, hares: Array<{ __typename?: 'hares', hasher: number, hasherInfo: { __typename?: 'hashers', email?: string | null } }> };

export type GqlAcceptVerifyQueryVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlAcceptVerifyQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', draft?: number | null, kennel: number, draftFor?: { __typename?: 'trails', id: number, kennel: number, hares: Array<{ __typename?: 'hares', hasher: number, hasherInfo: { __typename?: 'hashers', email?: string | null } }> } | null }> };

export type GqlDeleteVerifyQueryVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlDeleteVerifyQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', kennel: number, draft?: number | null, hares: Array<{ __typename?: 'hares', hasher: number, hasherInfo: { __typename?: 'hashers', email?: string | null } }> }> };

export type GqlTrailInfoFragment = { __typename?: 'trails', id: number, name: string, draft?: number | null, google_calendar?: string | null, kennel: number, hares: Array<{ __typename?: 'hares', hasher: number, hasherInfo: { __typename?: 'hashers', email?: string | null } }> };

export type GqlEditTrailInfoQueryVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlEditTrailInfoQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', id: number, name: string, draft?: number | null, google_calendar?: string | null, kennel: number, draftFor?: { __typename?: 'trails', id: number, name: string, draft?: number | null, google_calendar?: string | null, kennel: number, hares: Array<{ __typename?: 'hares', hasher: number, hasherInfo: { __typename?: 'hashers', email?: string | null } }> } | null, hares: Array<{ __typename?: 'hares', hasher: number, hasherInfo: { __typename?: 'hashers', email?: string | null } }> }> };

export type GqlHasherEmailQueryVariables = Exact<{
  hasher?: InputMaybe<Scalars['Int']>;
}>;


export type GqlHasherEmailQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', email?: string | null }> };

export type GqlInviteTrailInfoQueryVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlInviteTrailInfoQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', name: string, start: any, kennelInfo: { __typename?: 'kennels', name?: string | null }, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> }> };

export type GqlKennelIdForTrailQueryVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlKennelIdForTrailQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', kennel: number }> };

export type GqlHasherInfoServerQueryVariables = Exact<{
  hasherId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlHasherInfoServerQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', name?: string | null }> };

export type GqlGetKennelsKennelFragment = { __typename?: 'kennels', short_name?: string | null, name?: string | null, id: number, description?: string | null, trails_aggregate: { __typename?: 'trails_aggregate', aggregate?: { __typename?: 'trails_aggregate_fields', count: number } | null } };

export type GqlGetKennelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlGetKennelsQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', short_name?: string | null, name?: string | null, id: number, description?: string | null, trails_aggregate: { __typename?: 'trails_aggregate', aggregate?: { __typename?: 'trails_aggregate_fields', count: number } | null } }> };

export type GqlPermissionsEnumQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlPermissionsEnumQuery = { __typename?: 'query_root', permission_enum: Array<{ __typename?: 'permission_enum', description: string, permission: string }> };

export type PublicHasherInfoFragment = { __typename?: 'hashers', name?: string | null, id: number };

export type GqlGetHasherNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlGetHasherNamesQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', name?: string | null, id: number }> };

export type GqlNextFragment = { __typename?: 'kennels', frequency?: number | null, next?: any | null, trails: Array<{ __typename?: 'trails', start: any }> };

export type GqlKennelEditPartQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlKennelEditPartQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', area?: string | null, description?: string | null, frequency?: number | null, name?: string | null, short_name?: string | null, web?: string | null, next?: any | null, price?: any | null, trails: Array<{ __typename?: 'trails', start: any }> }> };

export type GqlKennelEditPageKennelFragment = { __typename?: 'kennels', id: number, short_name?: string | null, google_refresh?: string | null, google_token?: string | null, google_calendar?: string | null };

export type GqlKennelEditPageSsrQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
}>;


export type GqlKennelEditPageSsrQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', id: number, short_name?: string | null, google_refresh?: string | null, google_token?: string | null, google_calendar?: string | null }> };

export type PublicFragmentTrailFragment = { __typename?: 'trails', calculated_number?: number | null, number?: number | null, description?: string | null, directions?: string | null, id: number, latitude?: any | null, longitude?: any | null, name: string, start: any, draft?: number | null, kennelInfo: { __typename?: 'kennels', name?: string | null, short_name?: string | null, id: number }, drafts: Array<{ __typename?: 'trails', id: number }>, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null, id: number } }> };

export type GqlPageTrailIdQueryVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlPageTrailIdQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', calculated_number?: number | null, number?: number | null, description?: string | null, directions?: string | null, id: number, latitude?: any | null, longitude?: any | null, name: string, start: any, draft?: number | null, kennelInfo: { __typename?: 'kennels', name?: string | null, short_name?: string | null, id: number }, drafts: Array<{ __typename?: 'trails', id: number }>, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null, id: number } }> }> };

export type GqlPageTrailFragment = { __typename?: 'trails', calculated_number?: number | null, name: string, start: any, id: number, kennelInfo: { __typename?: 'kennels', short_name?: string | null, id: number }, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> };

export type GqlPageTrailsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['timestamptz']>;
  limit?: InputMaybe<Scalars['Int']>;
  filters?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GqlPageTrailsQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', calculated_number?: number | null, name: string, start: any, id: number, kennelInfo: { __typename?: 'kennels', short_name?: string | null, id: number }, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> }> };

export type GqlKennelInfoFragment = { __typename?: 'kennels', id: number, short_name?: string | null };

export type GqlTrailIndexPreloadQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlTrailIndexPreloadQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', id: number, short_name?: string | null }> };

export type GqlPageHasherHaresQueryVariables = Exact<{
  hasherId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlPageHasherHaresQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', id: number, short_name?: string | null, trails_aggregate: { __typename?: 'trails_aggregate', aggregate?: { __typename?: 'trails_aggregate_fields', count: number } | null } }> };

export type GqlKennelListFragment = { __typename?: 'kennels', id: number, name?: string | null };

export type GqlHasherManagementFragment = { __typename?: 'management', title?: string | null, kennelInfo: { __typename?: 'kennels', id: number, short_name?: string | null } };

export type GqlHasherInfoClientQueryVariables = Exact<{
  hasherId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlHasherInfoClientQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', name?: string | null, gm: Array<{ __typename?: 'kennels', id: number, name?: string | null }>, management: Array<{ __typename?: 'management', title?: string | null, kennelInfo: { __typename?: 'kennels', id: number, short_name?: string | null } }>, attendance_aggregate: { __typename?: 'attendance_aggregate', aggregate?: { __typename?: 'attendance_aggregate_fields', count: number } | null } }> };

export type GqlKennelPermissionCheckQueryVariables = Exact<{
  kennelID?: InputMaybe<Scalars['Int']>;
  permission?: InputMaybe<Permission_Enum_Enum>;
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlKennelPermissionCheckQuery = { __typename?: 'query_root', management: Array<{ __typename?: 'management', id: number }> };

export type GqlUserPermsQueryVariables = Exact<{
  hasherId?: InputMaybe<Scalars['Int']>;
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlUserPermsQuery = { __typename?: 'query_root', management: Array<{ __typename?: 'management', permissions: Array<{ __typename?: 'permissions', permission: Permission_Enum_Enum }> }> };

export type GqlVerifyCalendarAdminQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
}>;


export type GqlVerifyCalendarAdminQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', id: number }> };

export type GqlKennelAddInfoFragment = { __typename?: 'kennels', google_calendar?: string | null, short_name?: string | null, google_refresh?: string | null, google_token?: string | null, id: number, name?: string | null };

export type GqlRefreshKennelAddCountQueryVariables = Exact<{
  kennelID?: InputMaybe<Scalars['Int']>;
}>;


export type GqlRefreshKennelAddCountQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', google_calendar?: string | null, short_name?: string | null, google_refresh?: string | null, google_token?: string | null, id: number, name?: string | null, trails_aggregate: { __typename?: 'trails_aggregate', aggregate?: { __typename?: 'trails_aggregate_fields', count: number } | null } }> };

export type GqlInsertTrailFragment = { __typename?: 'trails', calculated_number?: number | null, id: number, name: string, start: any, latitude?: any | null, longitude?: any | null, directions?: string | null, google_calendar?: string | null, description?: string | null, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> };

export type GqlAddToCalendarQueryVariables = Exact<{
  kennelID?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GqlAddToCalendarQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', calculated_number?: number | null, id: number, name: string, start: any, latitude?: any | null, longitude?: any | null, directions?: string | null, google_calendar?: string | null, description?: string | null, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> }> };

export type GqlCalendarUpdateQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlCalendarUpdateQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', google_calendar?: string | null, gcal_dirty: boolean, calculated_number?: number | null, id: number, name: string, start: any, latitude?: any | null, longitude?: any | null, directions?: string | null, description?: string | null, kennelInfo: { __typename?: 'kennels', google_calendar?: string | null, short_name?: string | null, google_refresh?: string | null, google_token?: string | null, id: number, name?: string | null }, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> }> };

export type GqlGetGoogleCalendarIdQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlGetGoogleCalendarIdQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', google_calendar?: string | null, google_refresh?: string | null, google_token?: string | null }> };

export type GqlCountSetCalendarEntriesQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlCountSetCalendarEntriesQuery = { __typename?: 'query_root', trails_aggregate: { __typename?: 'trails_aggregate', aggregate?: { __typename?: 'trails_aggregate_fields', count: number } | null } };

export type GqlAllSetCalendarEntriesQueryVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GqlAllSetCalendarEntriesQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', google_calendar?: string | null, id: number }> };

export type GqlGetUserByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type GqlGetUserByEmailQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', id: number, email?: string | null, name?: string | null, email_verified?: any | null }> };

export type GqlCheckVerificationTokenQueryVariables = Exact<{
  identifier?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
}>;


export type GqlCheckVerificationTokenQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', login_expires?: any | null }> };

export type GqlGetSessionAndUserQueryVariables = Exact<{
  sessionToken?: InputMaybe<Scalars['String']>;
}>;


export type GqlGetSessionAndUserQuery = { __typename?: 'query_root', sessions: Array<{ __typename?: 'sessions', id: string, expires: any, user: { __typename?: 'hashers', email?: string | null, email_verified?: any | null, id: number, name?: string | null } }> };

export type GqlGetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type GqlGetUserQuery = { __typename?: 'query_root', hashers: Array<{ __typename?: 'hashers', email?: string | null, email_verified?: any | null, name?: string | null }> };

export type GqlGetUserByAccountQueryVariables = Exact<{
  provider?: InputMaybe<Scalars['String']>;
  providerAccountId?: InputMaybe<Scalars['String']>;
}>;


export type GqlGetUserByAccountQuery = { __typename?: 'query_root', account_links: Array<{ __typename?: 'account_links', user: { __typename?: 'hashers', id: number, email?: string | null, email_verified?: any | null, name?: string | null } }> };

export type GqlUpdateSessionQueryVariables = Exact<{
  sessionToken?: InputMaybe<Scalars['String']>;
}>;


export type GqlUpdateSessionQuery = { __typename?: 'query_root', sessions: Array<{ __typename?: 'sessions', id: string, user_id: number, expires: any }> };

export type GqlKennelForTrailQueryVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlKennelForTrailQuery = { __typename?: 'query_root', trails: Array<{ __typename?: 'trails', kennel: number, hares: Array<{ __typename?: 'hares', hasher: number }> }> };

export type ScheduleTrailsQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduleTrailsQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', frequency?: number | null, next?: any | null, id: number, short_name?: string | null, trails: Array<{ __typename?: 'trails', start: any, id: number }>, trails_aggregate: { __typename?: 'trails_aggregate', aggregate?: { __typename?: 'trails_aggregate_fields', max?: { __typename?: 'trails_max_fields', start?: any | null } | null } | null } }> };

export type SyncQueryVariables = Exact<{ [key: string]: never; }>;


export type SyncQuery = { __typename?: 'query_root', kennels: Array<{ __typename?: 'kennels', google_calendar?: string | null, short_name?: string | null, google_refresh?: string | null, google_token?: string | null, id: number, name?: string | null, trails: Array<{ __typename?: 'trails', calculated_number?: number | null, id: number, name: string, start: any, latitude?: any | null, longitude?: any | null, directions?: string | null, google_calendar?: string | null, description?: string | null, hares: Array<{ __typename?: 'hares', hasherInfo: { __typename?: 'hashers', name?: string | null } }> }> }> };

export type GqlKennelRolesEditViewSubscriptionVariables = Exact<{
  kennelId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlKennelRolesEditViewSubscription = { __typename?: 'subscription_root', kennels: Array<{ __typename?: 'kennels', management: Array<{ __typename?: 'management', id: number, title?: string | null, hasherInfo: { __typename?: 'hashers', id: number, name?: string | null }, permissions: Array<{ __typename?: 'permissions', permissionInfo: { __typename?: 'permission_enum', description: string, permission: string } }> }> }> };

export type GqlAttendanceViewSubscriptionVariables = Exact<{
  trailId?: InputMaybe<Scalars['Int']>;
}>;


export type GqlAttendanceViewSubscription = { __typename?: 'subscription_root', attendance: Array<{ __typename?: 'attendance', attended?: boolean | null, note?: string | null, paid?: boolean | null, hasherInfo: { __typename?: 'hashers', name?: string | null, id: number } }> };

export const GqlGetKennelPageKennelFragmentDoc = gql`
    fragment GQLGetKennelPageKennel on kennels {
  short_name
  name
  id
  description
  area
  web
  price
  frequency
  next
  google_calendar
  trails(
    limit: 10
    order_by: {calculated_number: asc}
    where: {start: {_gt: $after}, draft: {_is_null: true}}
  ) {
    calculated_number
    hares {
      hasherInfo {
        name
      }
    }
    id
    start
    name
  }
}
    `;
export const GqlHareCheckFragmentFragmentDoc = gql`
    fragment GQLHareCheckFragment on trails {
  kennel
  hares {
    hasher
    hasherInfo {
      email
    }
  }
}
    `;
export const GqlTrailInfoFragmentDoc = gql`
    fragment GQLTrailInfo on trails {
  id
  name
  draft
  google_calendar
  kennel
  ...GQLHareCheckFragment
}
    ${GqlHareCheckFragmentFragmentDoc}`;
export const GqlGetKennelsKennelFragmentDoc = gql`
    fragment GQLGetKennelsKennel on kennels {
  short_name
  name
  id
  description
  trails_aggregate(where: {start: {_gt: "now()"}}) {
    aggregate {
      count
    }
  }
}
    `;
export const GqlNextFragmentDoc = gql`
    fragment GQLNext on kennels {
  frequency
  next
  trails(limit: 1, order_by: {start: desc}, where: {draft: {_is_null: false}}) {
    start
  }
}
    `;
export const GqlKennelEditPageKennelFragmentDoc = gql`
    fragment GQLKennelEditPageKennel on kennels {
  id
  short_name
  google_refresh
  google_token
  google_calendar
}
    `;
export const PublicHasherInfoFragmentDoc = gql`
    fragment PublicHasherInfo on hashers {
  name
  id
}
    `;
export const PublicFragmentTrailFragmentDoc = gql`
    fragment PublicFragmentTrail on trails {
  calculated_number
  number
  description
  directions
  kennelInfo {
    name
    short_name
    id
  }
  id
  latitude
  longitude
  name
  start
  draft
  drafts {
    id
  }
  hares {
    hasherInfo {
      ...PublicHasherInfo
    }
  }
}
    ${PublicHasherInfoFragmentDoc}`;
export const GqlPageTrailFragmentDoc = gql`
    fragment GQLPageTrail on trails {
  calculated_number
  name
  start
  kennelInfo {
    short_name
    id
  }
  hares {
    hasherInfo {
      name
    }
  }
  id
}
    `;
export const GqlKennelInfoFragmentDoc = gql`
    fragment GQLKennelInfo on kennels {
  id
  short_name
}
    `;
export const GqlKennelListFragmentDoc = gql`
    fragment GQLKennelList on kennels {
  id
  name
}
    `;
export const GqlHasherManagementFragmentDoc = gql`
    fragment GQLHasherManagement on management {
  kennelInfo {
    id
    short_name
  }
  title
}
    `;
export const GqlKennelAddInfoFragmentDoc = gql`
    fragment GQLKennelAddInfo on kennels {
  google_calendar
  short_name
  google_refresh
  google_token
  id
  name
}
    `;
export const GqlInsertTrailFragmentDoc = gql`
    fragment GQLInsertTrail on trails {
  calculated_number
  id
  name
  start
  latitude
  longitude
  directions
  google_calendar
  description
  hares {
    hasherInfo {
      name
    }
  }
}
    `;
export const GqlUpdateAccessTokenDocument = gql`
    mutation GQLUpdateAccessToken($accessToken: String, $urt: String, $uat: String) {
  update_kennels(
    _set: {google_refresh: $urt, google_token: $uat}
    where: {google_token: {_eq: $accessToken}}
  ) {
    affected_rows
  }
}
    `;
export type GqlUpdateAccessTokenMutationFn = Apollo.MutationFunction<GqlUpdateAccessTokenMutation, GqlUpdateAccessTokenMutationVariables>;

/**
 * __useGqlUpdateAccessTokenMutation__
 *
 * To run a mutation, you first call `useGqlUpdateAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateAccessTokenMutation, { data, loading, error }] = useGqlUpdateAccessTokenMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      urt: // value for 'urt'
 *      uat: // value for 'uat'
 *   },
 * });
 */
export function useGqlUpdateAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateAccessTokenMutation, GqlUpdateAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateAccessTokenMutation, GqlUpdateAccessTokenMutationVariables>(GqlUpdateAccessTokenDocument, options);
      }
export type GqlUpdateAccessTokenMutationHookResult = ReturnType<typeof useGqlUpdateAccessTokenMutation>;
export type GqlUpdateAccessTokenMutationResult = Apollo.MutationResult<GqlUpdateAccessTokenMutation>;
export type GqlUpdateAccessTokenMutationOptions = Apollo.BaseMutationOptions<GqlUpdateAccessTokenMutation, GqlUpdateAccessTokenMutationVariables>;
export const GqlAddRolePermissionDocument = gql`
    mutation GQLAddRolePermission($role: Int, $permission: permission_enum_enum) {
  insert_permissions(objects: {role: $role, permission: $permission}) {
    affected_rows
  }
}
    `;
export type GqlAddRolePermissionMutationFn = Apollo.MutationFunction<GqlAddRolePermissionMutation, GqlAddRolePermissionMutationVariables>;

/**
 * __useGqlAddRolePermissionMutation__
 *
 * To run a mutation, you first call `useGqlAddRolePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlAddRolePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlAddRolePermissionMutation, { data, loading, error }] = useGqlAddRolePermissionMutation({
 *   variables: {
 *      role: // value for 'role'
 *      permission: // value for 'permission'
 *   },
 * });
 */
export function useGqlAddRolePermissionMutation(baseOptions?: Apollo.MutationHookOptions<GqlAddRolePermissionMutation, GqlAddRolePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlAddRolePermissionMutation, GqlAddRolePermissionMutationVariables>(GqlAddRolePermissionDocument, options);
      }
export type GqlAddRolePermissionMutationHookResult = ReturnType<typeof useGqlAddRolePermissionMutation>;
export type GqlAddRolePermissionMutationResult = Apollo.MutationResult<GqlAddRolePermissionMutation>;
export type GqlAddRolePermissionMutationOptions = Apollo.BaseMutationOptions<GqlAddRolePermissionMutation, GqlAddRolePermissionMutationVariables>;
export const GqlAddMismanagementDocument = gql`
    mutation GQLAddMismanagement($hasher: Int, $title: String, $kennelID: Int) {
  insert_management(objects: {hasher: $hasher, title: $title, kennel: $kennelID}) {
    affected_rows
  }
}
    `;
export type GqlAddMismanagementMutationFn = Apollo.MutationFunction<GqlAddMismanagementMutation, GqlAddMismanagementMutationVariables>;

/**
 * __useGqlAddMismanagementMutation__
 *
 * To run a mutation, you first call `useGqlAddMismanagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlAddMismanagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlAddMismanagementMutation, { data, loading, error }] = useGqlAddMismanagementMutation({
 *   variables: {
 *      hasher: // value for 'hasher'
 *      title: // value for 'title'
 *      kennelID: // value for 'kennelID'
 *   },
 * });
 */
export function useGqlAddMismanagementMutation(baseOptions?: Apollo.MutationHookOptions<GqlAddMismanagementMutation, GqlAddMismanagementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlAddMismanagementMutation, GqlAddMismanagementMutationVariables>(GqlAddMismanagementDocument, options);
      }
export type GqlAddMismanagementMutationHookResult = ReturnType<typeof useGqlAddMismanagementMutation>;
export type GqlAddMismanagementMutationResult = Apollo.MutationResult<GqlAddMismanagementMutation>;
export type GqlAddMismanagementMutationOptions = Apollo.BaseMutationOptions<GqlAddMismanagementMutation, GqlAddMismanagementMutationVariables>;
export const GqlUpdateRoleHasherDocument = gql`
    mutation GQLUpdateRoleHasher($role: Int, $kennelID: Int, $hasher: Int) {
  update_management(
    where: {id: {_eq: $role}, kennel: {_eq: $kennelID}}
    _set: {hasher: $hasher}
  ) {
    affected_rows
  }
}
    `;
export type GqlUpdateRoleHasherMutationFn = Apollo.MutationFunction<GqlUpdateRoleHasherMutation, GqlUpdateRoleHasherMutationVariables>;

/**
 * __useGqlUpdateRoleHasherMutation__
 *
 * To run a mutation, you first call `useGqlUpdateRoleHasherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateRoleHasherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateRoleHasherMutation, { data, loading, error }] = useGqlUpdateRoleHasherMutation({
 *   variables: {
 *      role: // value for 'role'
 *      kennelID: // value for 'kennelID'
 *      hasher: // value for 'hasher'
 *   },
 * });
 */
export function useGqlUpdateRoleHasherMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateRoleHasherMutation, GqlUpdateRoleHasherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateRoleHasherMutation, GqlUpdateRoleHasherMutationVariables>(GqlUpdateRoleHasherDocument, options);
      }
export type GqlUpdateRoleHasherMutationHookResult = ReturnType<typeof useGqlUpdateRoleHasherMutation>;
export type GqlUpdateRoleHasherMutationResult = Apollo.MutationResult<GqlUpdateRoleHasherMutation>;
export type GqlUpdateRoleHasherMutationOptions = Apollo.BaseMutationOptions<GqlUpdateRoleHasherMutation, GqlUpdateRoleHasherMutationVariables>;
export const GqlDeleteRoleDocument = gql`
    mutation GQLDeleteRole($role: Int, $kennelID: Int) {
  delete_management(where: {id: {_eq: $role}, kennel: {_eq: $kennelID}}) {
    affected_rows
  }
}
    `;
export type GqlDeleteRoleMutationFn = Apollo.MutationFunction<GqlDeleteRoleMutation, GqlDeleteRoleMutationVariables>;

/**
 * __useGqlDeleteRoleMutation__
 *
 * To run a mutation, you first call `useGqlDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlDeleteRoleMutation, { data, loading, error }] = useGqlDeleteRoleMutation({
 *   variables: {
 *      role: // value for 'role'
 *      kennelID: // value for 'kennelID'
 *   },
 * });
 */
export function useGqlDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<GqlDeleteRoleMutation, GqlDeleteRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlDeleteRoleMutation, GqlDeleteRoleMutationVariables>(GqlDeleteRoleDocument, options);
      }
export type GqlDeleteRoleMutationHookResult = ReturnType<typeof useGqlDeleteRoleMutation>;
export type GqlDeleteRoleMutationResult = Apollo.MutationResult<GqlDeleteRoleMutation>;
export type GqlDeleteRoleMutationOptions = Apollo.BaseMutationOptions<GqlDeleteRoleMutation, GqlDeleteRoleMutationVariables>;
export const GqlUpdateSelfDraftDocument = gql`
    mutation GQLUpdateSelfDraft($trailId: Int!) {
  update_trails_by_pk(pk_columns: {id: $trailId}, _set: {draft: $trailId}) {
    id
  }
}
    `;
export type GqlUpdateSelfDraftMutationFn = Apollo.MutationFunction<GqlUpdateSelfDraftMutation, GqlUpdateSelfDraftMutationVariables>;

/**
 * __useGqlUpdateSelfDraftMutation__
 *
 * To run a mutation, you first call `useGqlUpdateSelfDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateSelfDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateSelfDraftMutation, { data, loading, error }] = useGqlUpdateSelfDraftMutation({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlUpdateSelfDraftMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateSelfDraftMutation, GqlUpdateSelfDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateSelfDraftMutation, GqlUpdateSelfDraftMutationVariables>(GqlUpdateSelfDraftDocument, options);
      }
export type GqlUpdateSelfDraftMutationHookResult = ReturnType<typeof useGqlUpdateSelfDraftMutation>;
export type GqlUpdateSelfDraftMutationResult = Apollo.MutationResult<GqlUpdateSelfDraftMutation>;
export type GqlUpdateSelfDraftMutationOptions = Apollo.BaseMutationOptions<GqlUpdateSelfDraftMutation, GqlUpdateSelfDraftMutationVariables>;
export const GqlDeleteRolePermissionDocument = gql`
    mutation GQLDeleteRolePermission($role: Int, $permission: permission_enum_enum) {
  delete_permissions(where: {role: {_eq: $role}, permission: {_eq: $permission}}) {
    affected_rows
  }
}
    `;
export type GqlDeleteRolePermissionMutationFn = Apollo.MutationFunction<GqlDeleteRolePermissionMutation, GqlDeleteRolePermissionMutationVariables>;

/**
 * __useGqlDeleteRolePermissionMutation__
 *
 * To run a mutation, you first call `useGqlDeleteRolePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlDeleteRolePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlDeleteRolePermissionMutation, { data, loading, error }] = useGqlDeleteRolePermissionMutation({
 *   variables: {
 *      role: // value for 'role'
 *      permission: // value for 'permission'
 *   },
 * });
 */
export function useGqlDeleteRolePermissionMutation(baseOptions?: Apollo.MutationHookOptions<GqlDeleteRolePermissionMutation, GqlDeleteRolePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlDeleteRolePermissionMutation, GqlDeleteRolePermissionMutationVariables>(GqlDeleteRolePermissionDocument, options);
      }
export type GqlDeleteRolePermissionMutationHookResult = ReturnType<typeof useGqlDeleteRolePermissionMutation>;
export type GqlDeleteRolePermissionMutationResult = Apollo.MutationResult<GqlDeleteRolePermissionMutation>;
export type GqlDeleteRolePermissionMutationOptions = Apollo.BaseMutationOptions<GqlDeleteRolePermissionMutation, GqlDeleteRolePermissionMutationVariables>;
export const GqlSetCalendarIdDocument = gql`
    mutation GQLSetCalendarId($cal: String, $kennelID: Int, $userEmail: String) {
  update_kennels(
    where: {id: {_eq: $kennelID}, gm: {id: {}, email: {_eq: $userEmail}}}
    _set: {google_calendar: $cal}
  ) {
    returning {
      id
    }
  }
}
    `;
export type GqlSetCalendarIdMutationFn = Apollo.MutationFunction<GqlSetCalendarIdMutation, GqlSetCalendarIdMutationVariables>;

/**
 * __useGqlSetCalendarIdMutation__
 *
 * To run a mutation, you first call `useGqlSetCalendarIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlSetCalendarIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlSetCalendarIdMutation, { data, loading, error }] = useGqlSetCalendarIdMutation({
 *   variables: {
 *      cal: // value for 'cal'
 *      kennelID: // value for 'kennelID'
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useGqlSetCalendarIdMutation(baseOptions?: Apollo.MutationHookOptions<GqlSetCalendarIdMutation, GqlSetCalendarIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlSetCalendarIdMutation, GqlSetCalendarIdMutationVariables>(GqlSetCalendarIdDocument, options);
      }
export type GqlSetCalendarIdMutationHookResult = ReturnType<typeof useGqlSetCalendarIdMutation>;
export type GqlSetCalendarIdMutationResult = Apollo.MutationResult<GqlSetCalendarIdMutation>;
export type GqlSetCalendarIdMutationOptions = Apollo.BaseMutationOptions<GqlSetCalendarIdMutation, GqlSetCalendarIdMutationVariables>;
export const GqlClearDraftMutationDocument = gql`
    mutation GQLClearDraftMutation($trailId: Int!) {
  update_trails_by_pk(pk_columns: {id: $trailId}, _set: {draft: null}) {
    id
  }
}
    `;
export type GqlClearDraftMutationMutationFn = Apollo.MutationFunction<GqlClearDraftMutationMutation, GqlClearDraftMutationMutationVariables>;

/**
 * __useGqlClearDraftMutationMutation__
 *
 * To run a mutation, you first call `useGqlClearDraftMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlClearDraftMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlClearDraftMutationMutation, { data, loading, error }] = useGqlClearDraftMutationMutation({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlClearDraftMutationMutation(baseOptions?: Apollo.MutationHookOptions<GqlClearDraftMutationMutation, GqlClearDraftMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlClearDraftMutationMutation, GqlClearDraftMutationMutationVariables>(GqlClearDraftMutationDocument, options);
      }
export type GqlClearDraftMutationMutationHookResult = ReturnType<typeof useGqlClearDraftMutationMutation>;
export type GqlClearDraftMutationMutationResult = Apollo.MutationResult<GqlClearDraftMutationMutation>;
export type GqlClearDraftMutationMutationOptions = Apollo.BaseMutationOptions<GqlClearDraftMutationMutation, GqlClearDraftMutationMutationVariables>;
export const GqlInsertTrailDocument = gql`
    mutation GQLInsertTrail($id: Int = null, $calculated_number: Int, $description: String, $directions: String, $draft: Int, $google_calendar: String, $hares: [hares_insert_input!]!, $kennel: Int, $latitude: float8, $longitude: float8, $name: String, $number: Int, $start: timestamptz) {
  insert_trails_one(
    object: {id: $id, calculated_number: $calculated_number, description: $description, directions: $directions, draft: $draft, google_calendar: $google_calendar, hares: {data: $hares}, kennel: $kennel, latitude: $latitude, longitude: $longitude, name: $name, number: $number, start: $start}
  ) {
    id
  }
}
    `;
export type GqlInsertTrailMutationFn = Apollo.MutationFunction<GqlInsertTrailMutation, GqlInsertTrailMutationVariables>;

/**
 * __useGqlInsertTrailMutation__
 *
 * To run a mutation, you first call `useGqlInsertTrailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlInsertTrailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlInsertTrailMutation, { data, loading, error }] = useGqlInsertTrailMutation({
 *   variables: {
 *      id: // value for 'id'
 *      calculated_number: // value for 'calculated_number'
 *      description: // value for 'description'
 *      directions: // value for 'directions'
 *      draft: // value for 'draft'
 *      google_calendar: // value for 'google_calendar'
 *      hares: // value for 'hares'
 *      kennel: // value for 'kennel'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      name: // value for 'name'
 *      number: // value for 'number'
 *      start: // value for 'start'
 *   },
 * });
 */
export function useGqlInsertTrailMutation(baseOptions?: Apollo.MutationHookOptions<GqlInsertTrailMutation, GqlInsertTrailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlInsertTrailMutation, GqlInsertTrailMutationVariables>(GqlInsertTrailDocument, options);
      }
export type GqlInsertTrailMutationHookResult = ReturnType<typeof useGqlInsertTrailMutation>;
export type GqlInsertTrailMutationResult = Apollo.MutationResult<GqlInsertTrailMutation>;
export type GqlInsertTrailMutationOptions = Apollo.BaseMutationOptions<GqlInsertTrailMutation, GqlInsertTrailMutationVariables>;
export const GqlInsertTrailDraftDocument = gql`
    mutation GQLInsertTrailDraft($calculated_number: Int, $description: String, $directions: String, $draft: Int, $google_calendar: String, $hares: [hares_insert_input!]!, $kennel: Int, $latitude: float8, $longitude: float8, $name: String, $number: Int, $start: timestamptz) {
  insert_trails_one(
    object: {calculated_number: $calculated_number, description: $description, directions: $directions, draft: $draft, google_calendar: $google_calendar, hares: {data: $hares}, kennel: $kennel, gcal_dirty: true, latitude: $latitude, longitude: $longitude, name: $name, number: $number, start: $start}
  ) {
    id
  }
}
    `;
export type GqlInsertTrailDraftMutationFn = Apollo.MutationFunction<GqlInsertTrailDraftMutation, GqlInsertTrailDraftMutationVariables>;

/**
 * __useGqlInsertTrailDraftMutation__
 *
 * To run a mutation, you first call `useGqlInsertTrailDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlInsertTrailDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlInsertTrailDraftMutation, { data, loading, error }] = useGqlInsertTrailDraftMutation({
 *   variables: {
 *      calculated_number: // value for 'calculated_number'
 *      description: // value for 'description'
 *      directions: // value for 'directions'
 *      draft: // value for 'draft'
 *      google_calendar: // value for 'google_calendar'
 *      hares: // value for 'hares'
 *      kennel: // value for 'kennel'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      name: // value for 'name'
 *      number: // value for 'number'
 *      start: // value for 'start'
 *   },
 * });
 */
export function useGqlInsertTrailDraftMutation(baseOptions?: Apollo.MutationHookOptions<GqlInsertTrailDraftMutation, GqlInsertTrailDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlInsertTrailDraftMutation, GqlInsertTrailDraftMutationVariables>(GqlInsertTrailDraftDocument, options);
      }
export type GqlInsertTrailDraftMutationHookResult = ReturnType<typeof useGqlInsertTrailDraftMutation>;
export type GqlInsertTrailDraftMutationResult = Apollo.MutationResult<GqlInsertTrailDraftMutation>;
export type GqlInsertTrailDraftMutationOptions = Apollo.BaseMutationOptions<GqlInsertTrailDraftMutation, GqlInsertTrailDraftMutationVariables>;
export const GqlUpdateGoogleTokensDocument = gql`
    mutation GQLUpdateGoogleTokens($accessToken: String, $refreshToken: String, $kennelID: Int) {
  update_kennels(
    _set: {google_refresh: $refreshToken, google_token: $accessToken}
    where: {id: {_eq: $kennelID}}
  ) {
    affected_rows
  }
}
    `;
export type GqlUpdateGoogleTokensMutationFn = Apollo.MutationFunction<GqlUpdateGoogleTokensMutation, GqlUpdateGoogleTokensMutationVariables>;

/**
 * __useGqlUpdateGoogleTokensMutation__
 *
 * To run a mutation, you first call `useGqlUpdateGoogleTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateGoogleTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateGoogleTokensMutation, { data, loading, error }] = useGqlUpdateGoogleTokensMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      refreshToken: // value for 'refreshToken'
 *      kennelID: // value for 'kennelID'
 *   },
 * });
 */
export function useGqlUpdateGoogleTokensMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateGoogleTokensMutation, GqlUpdateGoogleTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateGoogleTokensMutation, GqlUpdateGoogleTokensMutationVariables>(GqlUpdateGoogleTokensDocument, options);
      }
export type GqlUpdateGoogleTokensMutationHookResult = ReturnType<typeof useGqlUpdateGoogleTokensMutation>;
export type GqlUpdateGoogleTokensMutationResult = Apollo.MutationResult<GqlUpdateGoogleTokensMutation>;
export type GqlUpdateGoogleTokensMutationOptions = Apollo.BaseMutationOptions<GqlUpdateGoogleTokensMutation, GqlUpdateGoogleTokensMutationVariables>;
export const GqlUpdateAttendanceDocument = gql`
    mutation GQLUpdateAttendance($attended: Boolean, $hasher: Int, $trail: Int, $note: String = "") {
  insert_attendance_one(
    object: {attended: $attended, hasher: $hasher, trail: $trail, note: $note}
    on_conflict: {constraint: attendance_pkey, update_columns: attended}
  ) {
    attended
  }
}
    `;
export type GqlUpdateAttendanceMutationFn = Apollo.MutationFunction<GqlUpdateAttendanceMutation, GqlUpdateAttendanceMutationVariables>;

/**
 * __useGqlUpdateAttendanceMutation__
 *
 * To run a mutation, you first call `useGqlUpdateAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateAttendanceMutation, { data, loading, error }] = useGqlUpdateAttendanceMutation({
 *   variables: {
 *      attended: // value for 'attended'
 *      hasher: // value for 'hasher'
 *      trail: // value for 'trail'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useGqlUpdateAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateAttendanceMutation, GqlUpdateAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateAttendanceMutation, GqlUpdateAttendanceMutationVariables>(GqlUpdateAttendanceDocument, options);
      }
export type GqlUpdateAttendanceMutationHookResult = ReturnType<typeof useGqlUpdateAttendanceMutation>;
export type GqlUpdateAttendanceMutationResult = Apollo.MutationResult<GqlUpdateAttendanceMutation>;
export type GqlUpdateAttendanceMutationOptions = Apollo.BaseMutationOptions<GqlUpdateAttendanceMutation, GqlUpdateAttendanceMutationVariables>;
export const GqlClearCalendarInfoFromTrailDocument = gql`
    mutation GQLClearCalendarInfoFromTrail($trailIds: [Int!]) {
  update_trails(where: {id: {_in: $trailIds}}, _set: {google_calendar: null}) {
    affected_rows
  }
}
    `;
export type GqlClearCalendarInfoFromTrailMutationFn = Apollo.MutationFunction<GqlClearCalendarInfoFromTrailMutation, GqlClearCalendarInfoFromTrailMutationVariables>;

/**
 * __useGqlClearCalendarInfoFromTrailMutation__
 *
 * To run a mutation, you first call `useGqlClearCalendarInfoFromTrailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlClearCalendarInfoFromTrailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlClearCalendarInfoFromTrailMutation, { data, loading, error }] = useGqlClearCalendarInfoFromTrailMutation({
 *   variables: {
 *      trailIds: // value for 'trailIds'
 *   },
 * });
 */
export function useGqlClearCalendarInfoFromTrailMutation(baseOptions?: Apollo.MutationHookOptions<GqlClearCalendarInfoFromTrailMutation, GqlClearCalendarInfoFromTrailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlClearCalendarInfoFromTrailMutation, GqlClearCalendarInfoFromTrailMutationVariables>(GqlClearCalendarInfoFromTrailDocument, options);
      }
export type GqlClearCalendarInfoFromTrailMutationHookResult = ReturnType<typeof useGqlClearCalendarInfoFromTrailMutation>;
export type GqlClearCalendarInfoFromTrailMutationResult = Apollo.MutationResult<GqlClearCalendarInfoFromTrailMutation>;
export type GqlClearCalendarInfoFromTrailMutationOptions = Apollo.BaseMutationOptions<GqlClearCalendarInfoFromTrailMutation, GqlClearCalendarInfoFromTrailMutationVariables>;
export const GqlMarkCleanDocument = gql`
    mutation GQLMarkClean($trailId: Int) {
  update_trails(where: {id: {_eq: $trailId}}, _set: {gcal_dirty: false}) {
    affected_rows
  }
}
    `;
export type GqlMarkCleanMutationFn = Apollo.MutationFunction<GqlMarkCleanMutation, GqlMarkCleanMutationVariables>;

/**
 * __useGqlMarkCleanMutation__
 *
 * To run a mutation, you first call `useGqlMarkCleanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlMarkCleanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlMarkCleanMutation, { data, loading, error }] = useGqlMarkCleanMutation({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlMarkCleanMutation(baseOptions?: Apollo.MutationHookOptions<GqlMarkCleanMutation, GqlMarkCleanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlMarkCleanMutation, GqlMarkCleanMutationVariables>(GqlMarkCleanDocument, options);
      }
export type GqlMarkCleanMutationHookResult = ReturnType<typeof useGqlMarkCleanMutation>;
export type GqlMarkCleanMutationResult = Apollo.MutationResult<GqlMarkCleanMutation>;
export type GqlMarkCleanMutationOptions = Apollo.BaseMutationOptions<GqlMarkCleanMutation, GqlMarkCleanMutationVariables>;
export const GqlUpdateKennelDocument = gql`
    mutation GQLUpdateKennel($kennelID: Int!, $frequency: Int, $area: String, $description: String, $name: String, $next: timestamptz, $price: float8, $short: String, $web: String) {
  update_kennels_by_pk(
    pk_columns: {id: $kennelID}
    _set: {frequency: $frequency, area: $area, description: $description, name: $name, next: $next, price: $price, short_name: $short, web: $web}
  ) {
    id
  }
}
    `;
export type GqlUpdateKennelMutationFn = Apollo.MutationFunction<GqlUpdateKennelMutation, GqlUpdateKennelMutationVariables>;

/**
 * __useGqlUpdateKennelMutation__
 *
 * To run a mutation, you first call `useGqlUpdateKennelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateKennelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateKennelMutation, { data, loading, error }] = useGqlUpdateKennelMutation({
 *   variables: {
 *      kennelID: // value for 'kennelID'
 *      frequency: // value for 'frequency'
 *      area: // value for 'area'
 *      description: // value for 'description'
 *      name: // value for 'name'
 *      next: // value for 'next'
 *      price: // value for 'price'
 *      short: // value for 'short'
 *      web: // value for 'web'
 *   },
 * });
 */
export function useGqlUpdateKennelMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateKennelMutation, GqlUpdateKennelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateKennelMutation, GqlUpdateKennelMutationVariables>(GqlUpdateKennelDocument, options);
      }
export type GqlUpdateKennelMutationHookResult = ReturnType<typeof useGqlUpdateKennelMutation>;
export type GqlUpdateKennelMutationResult = Apollo.MutationResult<GqlUpdateKennelMutation>;
export type GqlUpdateKennelMutationOptions = Apollo.BaseMutationOptions<GqlUpdateKennelMutation, GqlUpdateKennelMutationVariables>;
export const GqlUpdateTrailGidDocument = gql`
    mutation GQLUpdateTrailGID($gid: String, $trailId: Int) {
  update_trails(
    where: {id: {_eq: $trailId}}
    _set: {google_calendar: $gid, gcal_dirty: false}
  ) {
    affected_rows
  }
}
    `;
export type GqlUpdateTrailGidMutationFn = Apollo.MutationFunction<GqlUpdateTrailGidMutation, GqlUpdateTrailGidMutationVariables>;

/**
 * __useGqlUpdateTrailGidMutation__
 *
 * To run a mutation, you first call `useGqlUpdateTrailGidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateTrailGidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateTrailGidMutation, { data, loading, error }] = useGqlUpdateTrailGidMutation({
 *   variables: {
 *      gid: // value for 'gid'
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlUpdateTrailGidMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateTrailGidMutation, GqlUpdateTrailGidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateTrailGidMutation, GqlUpdateTrailGidMutationVariables>(GqlUpdateTrailGidDocument, options);
      }
export type GqlUpdateTrailGidMutationHookResult = ReturnType<typeof useGqlUpdateTrailGidMutation>;
export type GqlUpdateTrailGidMutationResult = Apollo.MutationResult<GqlUpdateTrailGidMutation>;
export type GqlUpdateTrailGidMutationOptions = Apollo.BaseMutationOptions<GqlUpdateTrailGidMutation, GqlUpdateTrailGidMutationVariables>;
export const GqlInsertHasherDocument = gql`
    mutation GQLInsertHasher($email: String!, $name: String) {
  insert_hashers(
    objects: {email: $email, name: $name}
    on_conflict: {constraint: hashers_email_key}
  ) {
    returning {
      name
      id
    }
  }
}
    `;
export type GqlInsertHasherMutationFn = Apollo.MutationFunction<GqlInsertHasherMutation, GqlInsertHasherMutationVariables>;

/**
 * __useGqlInsertHasherMutation__
 *
 * To run a mutation, you first call `useGqlInsertHasherMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlInsertHasherMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlInsertHasherMutation, { data, loading, error }] = useGqlInsertHasherMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGqlInsertHasherMutation(baseOptions?: Apollo.MutationHookOptions<GqlInsertHasherMutation, GqlInsertHasherMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlInsertHasherMutation, GqlInsertHasherMutationVariables>(GqlInsertHasherDocument, options);
      }
export type GqlInsertHasherMutationHookResult = ReturnType<typeof useGqlInsertHasherMutation>;
export type GqlInsertHasherMutationResult = Apollo.MutationResult<GqlInsertHasherMutation>;
export type GqlInsertHasherMutationOptions = Apollo.BaseMutationOptions<GqlInsertHasherMutation, GqlInsertHasherMutationVariables>;
export const GqlDeleteTrailDocument = gql`
    mutation GQLDeleteTrail($trailId: Int) {
  delete_trails(where: {id: {_eq: $trailId}}) {
    affected_rows
    returning {
      google_calendar
      kennelInfo {
        google_refresh
        google_token
        google_calendar
      }
    }
  }
}
    `;
export type GqlDeleteTrailMutationFn = Apollo.MutationFunction<GqlDeleteTrailMutation, GqlDeleteTrailMutationVariables>;

/**
 * __useGqlDeleteTrailMutation__
 *
 * To run a mutation, you first call `useGqlDeleteTrailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlDeleteTrailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlDeleteTrailMutation, { data, loading, error }] = useGqlDeleteTrailMutation({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlDeleteTrailMutation(baseOptions?: Apollo.MutationHookOptions<GqlDeleteTrailMutation, GqlDeleteTrailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlDeleteTrailMutation, GqlDeleteTrailMutationVariables>(GqlDeleteTrailDocument, options);
      }
export type GqlDeleteTrailMutationHookResult = ReturnType<typeof useGqlDeleteTrailMutation>;
export type GqlDeleteTrailMutationResult = Apollo.MutationResult<GqlDeleteTrailMutation>;
export type GqlDeleteTrailMutationOptions = Apollo.BaseMutationOptions<GqlDeleteTrailMutation, GqlDeleteTrailMutationVariables>;
export const GqlFixTrailNumberInfoDocument = gql`
    query GQLFixTrailNumberInfo($kennelId: Int) {
  trails(
    where: {draft: {_is_null: true}, kennel: {_eq: $kennelId}}
    order_by: {start: asc}
  ) {
    number
    calculated_number
    id
    start
    hares {
      hasherInfo {
        id
      }
    }
  }
}
    `;

/**
 * __useGqlFixTrailNumberInfoQuery__
 *
 * To run a query within a React component, call `useGqlFixTrailNumberInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlFixTrailNumberInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlFixTrailNumberInfoQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlFixTrailNumberInfoQuery(baseOptions?: Apollo.QueryHookOptions<GqlFixTrailNumberInfoQuery, GqlFixTrailNumberInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlFixTrailNumberInfoQuery, GqlFixTrailNumberInfoQueryVariables>(GqlFixTrailNumberInfoDocument, options);
      }
export function useGqlFixTrailNumberInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlFixTrailNumberInfoQuery, GqlFixTrailNumberInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlFixTrailNumberInfoQuery, GqlFixTrailNumberInfoQueryVariables>(GqlFixTrailNumberInfoDocument, options);
        }
export type GqlFixTrailNumberInfoQueryHookResult = ReturnType<typeof useGqlFixTrailNumberInfoQuery>;
export type GqlFixTrailNumberInfoLazyQueryHookResult = ReturnType<typeof useGqlFixTrailNumberInfoLazyQuery>;
export type GqlFixTrailNumberInfoQueryResult = Apollo.QueryResult<GqlFixTrailNumberInfoQuery, GqlFixTrailNumberInfoQueryVariables>;
export const GqlUpdateCalculatedNumberDocument = gql`
    mutation GQLUpdateCalculatedNumber($id: Int!, $calculated_number: Int) {
  update_trails_by_pk(
    pk_columns: {id: $id}
    _set: {calculated_number: $calculated_number, gcal_dirty: true}
  ) {
    id
  }
}
    `;
export type GqlUpdateCalculatedNumberMutationFn = Apollo.MutationFunction<GqlUpdateCalculatedNumberMutation, GqlUpdateCalculatedNumberMutationVariables>;

/**
 * __useGqlUpdateCalculatedNumberMutation__
 *
 * To run a mutation, you first call `useGqlUpdateCalculatedNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateCalculatedNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateCalculatedNumberMutation, { data, loading, error }] = useGqlUpdateCalculatedNumberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      calculated_number: // value for 'calculated_number'
 *   },
 * });
 */
export function useGqlUpdateCalculatedNumberMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateCalculatedNumberMutation, GqlUpdateCalculatedNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateCalculatedNumberMutation, GqlUpdateCalculatedNumberMutationVariables>(GqlUpdateCalculatedNumberDocument, options);
      }
export type GqlUpdateCalculatedNumberMutationHookResult = ReturnType<typeof useGqlUpdateCalculatedNumberMutation>;
export type GqlUpdateCalculatedNumberMutationResult = Apollo.MutationResult<GqlUpdateCalculatedNumberMutation>;
export type GqlUpdateCalculatedNumberMutationOptions = Apollo.BaseMutationOptions<GqlUpdateCalculatedNumberMutation, GqlUpdateCalculatedNumberMutationVariables>;
export const GqlMoveAttendanceDocument = gql`
    mutation GQLMoveAttendance($from: Int, $to: Int) {
  update_attendance(where: {trail: {_eq: $from}}, _set: {trail: $to}) {
    affected_rows
  }
}
    `;
export type GqlMoveAttendanceMutationFn = Apollo.MutationFunction<GqlMoveAttendanceMutation, GqlMoveAttendanceMutationVariables>;

/**
 * __useGqlMoveAttendanceMutation__
 *
 * To run a mutation, you first call `useGqlMoveAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlMoveAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlMoveAttendanceMutation, { data, loading, error }] = useGqlMoveAttendanceMutation({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useGqlMoveAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<GqlMoveAttendanceMutation, GqlMoveAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlMoveAttendanceMutation, GqlMoveAttendanceMutationVariables>(GqlMoveAttendanceDocument, options);
      }
export type GqlMoveAttendanceMutationHookResult = ReturnType<typeof useGqlMoveAttendanceMutation>;
export type GqlMoveAttendanceMutationResult = Apollo.MutationResult<GqlMoveAttendanceMutation>;
export type GqlMoveAttendanceMutationOptions = Apollo.BaseMutationOptions<GqlMoveAttendanceMutation, GqlMoveAttendanceMutationVariables>;
export const GqlAcceptDraftMutationDocument = gql`
    mutation GQLAcceptDraftMutation($from: Int!, $to: Int!) {
  update_trails_by_pk(
    pk_columns: {id: $from}
    _set: {id: $to, gcal_dirty: true, draft: null}
  ) {
    id
  }
}
    `;
export type GqlAcceptDraftMutationMutationFn = Apollo.MutationFunction<GqlAcceptDraftMutationMutation, GqlAcceptDraftMutationMutationVariables>;

/**
 * __useGqlAcceptDraftMutationMutation__
 *
 * To run a mutation, you first call `useGqlAcceptDraftMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlAcceptDraftMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlAcceptDraftMutationMutation, { data, loading, error }] = useGqlAcceptDraftMutationMutation({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useGqlAcceptDraftMutationMutation(baseOptions?: Apollo.MutationHookOptions<GqlAcceptDraftMutationMutation, GqlAcceptDraftMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlAcceptDraftMutationMutation, GqlAcceptDraftMutationMutationVariables>(GqlAcceptDraftMutationDocument, options);
      }
export type GqlAcceptDraftMutationMutationHookResult = ReturnType<typeof useGqlAcceptDraftMutationMutation>;
export type GqlAcceptDraftMutationMutationResult = Apollo.MutationResult<GqlAcceptDraftMutationMutation>;
export type GqlAcceptDraftMutationMutationOptions = Apollo.BaseMutationOptions<GqlAcceptDraftMutationMutation, GqlAcceptDraftMutationMutationVariables>;
export const GqlCreateVerificationTokenDocument = gql`
    mutation GQLCreateVerificationToken($token: String, $expires: timestamptz, $email: String) {
  update_hashers(
    where: {email: {_eq: $email}}
    _set: {login: $token, login_expires: $expires}
  ) {
    returning {
      id
    }
  }
}
    `;
export type GqlCreateVerificationTokenMutationFn = Apollo.MutationFunction<GqlCreateVerificationTokenMutation, GqlCreateVerificationTokenMutationVariables>;

/**
 * __useGqlCreateVerificationTokenMutation__
 *
 * To run a mutation, you first call `useGqlCreateVerificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlCreateVerificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlCreateVerificationTokenMutation, { data, loading, error }] = useGqlCreateVerificationTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      expires: // value for 'expires'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGqlCreateVerificationTokenMutation(baseOptions?: Apollo.MutationHookOptions<GqlCreateVerificationTokenMutation, GqlCreateVerificationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlCreateVerificationTokenMutation, GqlCreateVerificationTokenMutationVariables>(GqlCreateVerificationTokenDocument, options);
      }
export type GqlCreateVerificationTokenMutationHookResult = ReturnType<typeof useGqlCreateVerificationTokenMutation>;
export type GqlCreateVerificationTokenMutationResult = Apollo.MutationResult<GqlCreateVerificationTokenMutation>;
export type GqlCreateVerificationTokenMutationOptions = Apollo.BaseMutationOptions<GqlCreateVerificationTokenMutation, GqlCreateVerificationTokenMutationVariables>;
export const GqlUseVerificationTokenDocument = gql`
    mutation GQLUseVerificationToken($identifier: String, $token: String, $email_verified: timestamptz) {
  update_hashers(
    where: {email: {_eq: $identifier}, login: {_eq: $token}}
    _set: {login: null, login_expires: null, email_verified: $email_verified}
  ) {
    returning {
      login_expires
    }
  }
}
    `;
export type GqlUseVerificationTokenMutationFn = Apollo.MutationFunction<GqlUseVerificationTokenMutation, GqlUseVerificationTokenMutationVariables>;

/**
 * __useGqlUseVerificationTokenMutation__
 *
 * To run a mutation, you first call `useGqlUseVerificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUseVerificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUseVerificationTokenMutation, { data, loading, error }] = useGqlUseVerificationTokenMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      token: // value for 'token'
 *      email_verified: // value for 'email_verified'
 *   },
 * });
 */
export function useGqlUseVerificationTokenMutation(baseOptions?: Apollo.MutationHookOptions<GqlUseVerificationTokenMutation, GqlUseVerificationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUseVerificationTokenMutation, GqlUseVerificationTokenMutationVariables>(GqlUseVerificationTokenDocument, options);
      }
export type GqlUseVerificationTokenMutationHookResult = ReturnType<typeof useGqlUseVerificationTokenMutation>;
export type GqlUseVerificationTokenMutationResult = Apollo.MutationResult<GqlUseVerificationTokenMutation>;
export type GqlUseVerificationTokenMutationOptions = Apollo.BaseMutationOptions<GqlUseVerificationTokenMutation, GqlUseVerificationTokenMutationVariables>;
export const GqlDeleteSessionDocument = gql`
    mutation GQLDeleteSession($sessionToken: String) {
  delete_sessions(where: {session_token: {_eq: $sessionToken}}) {
    returning {
      expires
      id
      user_id
    }
  }
}
    `;
export type GqlDeleteSessionMutationFn = Apollo.MutationFunction<GqlDeleteSessionMutation, GqlDeleteSessionMutationVariables>;

/**
 * __useGqlDeleteSessionMutation__
 *
 * To run a mutation, you first call `useGqlDeleteSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlDeleteSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlDeleteSessionMutation, { data, loading, error }] = useGqlDeleteSessionMutation({
 *   variables: {
 *      sessionToken: // value for 'sessionToken'
 *   },
 * });
 */
export function useGqlDeleteSessionMutation(baseOptions?: Apollo.MutationHookOptions<GqlDeleteSessionMutation, GqlDeleteSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlDeleteSessionMutation, GqlDeleteSessionMutationVariables>(GqlDeleteSessionDocument, options);
      }
export type GqlDeleteSessionMutationHookResult = ReturnType<typeof useGqlDeleteSessionMutation>;
export type GqlDeleteSessionMutationResult = Apollo.MutationResult<GqlDeleteSessionMutation>;
export type GqlDeleteSessionMutationOptions = Apollo.BaseMutationOptions<GqlDeleteSessionMutation, GqlDeleteSessionMutationVariables>;
export const GqlUpdateUserDocument = gql`
    mutation GQLUpdateUser($id: Int = 10, $emailVerified: timestamptz) {
  update_hashers(where: {id: {_eq: $id}}, _set: {email_verified: $emailVerified}) {
    returning {
      email
      email_verified
      id
      name
    }
  }
}
    `;
export type GqlUpdateUserMutationFn = Apollo.MutationFunction<GqlUpdateUserMutation, GqlUpdateUserMutationVariables>;

/**
 * __useGqlUpdateUserMutation__
 *
 * To run a mutation, you first call `useGqlUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateUserMutation, { data, loading, error }] = useGqlUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      emailVerified: // value for 'emailVerified'
 *   },
 * });
 */
export function useGqlUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateUserMutation, GqlUpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateUserMutation, GqlUpdateUserMutationVariables>(GqlUpdateUserDocument, options);
      }
export type GqlUpdateUserMutationHookResult = ReturnType<typeof useGqlUpdateUserMutation>;
export type GqlUpdateUserMutationResult = Apollo.MutationResult<GqlUpdateUserMutation>;
export type GqlUpdateUserMutationOptions = Apollo.BaseMutationOptions<GqlUpdateUserMutation, GqlUpdateUserMutationVariables>;
export const GqlCreateSessionDocument = gql`
    mutation GQLCreateSession($sessionToken: String, $userId: Int = 10, $expires: timestamptz, $id: String = "") {
  insert_sessions_one(
    object: {session_token: $sessionToken, user_id: $userId, expires: $expires, id: $id}
  ) {
    id
  }
}
    `;
export type GqlCreateSessionMutationFn = Apollo.MutationFunction<GqlCreateSessionMutation, GqlCreateSessionMutationVariables>;

/**
 * __useGqlCreateSessionMutation__
 *
 * To run a mutation, you first call `useGqlCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlCreateSessionMutation, { data, loading, error }] = useGqlCreateSessionMutation({
 *   variables: {
 *      sessionToken: // value for 'sessionToken'
 *      userId: // value for 'userId'
 *      expires: // value for 'expires'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGqlCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<GqlCreateSessionMutation, GqlCreateSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlCreateSessionMutation, GqlCreateSessionMutationVariables>(GqlCreateSessionDocument, options);
      }
export type GqlCreateSessionMutationHookResult = ReturnType<typeof useGqlCreateSessionMutation>;
export type GqlCreateSessionMutationResult = Apollo.MutationResult<GqlCreateSessionMutation>;
export type GqlCreateSessionMutationOptions = Apollo.BaseMutationOptions<GqlCreateSessionMutation, GqlCreateSessionMutationVariables>;
export const GqlCreateUserDocument = gql`
    mutation GQLCreateUser($email: String, $name: String) {
  insert_hashers_one(object: {email: $email, name: $name}) {
    id
  }
}
    `;
export type GqlCreateUserMutationFn = Apollo.MutationFunction<GqlCreateUserMutation, GqlCreateUserMutationVariables>;

/**
 * __useGqlCreateUserMutation__
 *
 * To run a mutation, you first call `useGqlCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlCreateUserMutation, { data, loading, error }] = useGqlCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGqlCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<GqlCreateUserMutation, GqlCreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlCreateUserMutation, GqlCreateUserMutationVariables>(GqlCreateUserDocument, options);
      }
export type GqlCreateUserMutationHookResult = ReturnType<typeof useGqlCreateUserMutation>;
export type GqlCreateUserMutationResult = Apollo.MutationResult<GqlCreateUserMutation>;
export type GqlCreateUserMutationOptions = Apollo.BaseMutationOptions<GqlCreateUserMutation, GqlCreateUserMutationVariables>;
export const GqlLinkAccountDocument = gql`
    mutation GQLLinkAccount($provider: String, $providerAccountId: String, $userId: Int) {
  insert_account_links_one(
    object: {provider: $provider, provider_id: $providerAccountId, user_id: $userId}
  ) {
    user_id
  }
}
    `;
export type GqlLinkAccountMutationFn = Apollo.MutationFunction<GqlLinkAccountMutation, GqlLinkAccountMutationVariables>;

/**
 * __useGqlLinkAccountMutation__
 *
 * To run a mutation, you first call `useGqlLinkAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlLinkAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlLinkAccountMutation, { data, loading, error }] = useGqlLinkAccountMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *      providerAccountId: // value for 'providerAccountId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGqlLinkAccountMutation(baseOptions?: Apollo.MutationHookOptions<GqlLinkAccountMutation, GqlLinkAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlLinkAccountMutation, GqlLinkAccountMutationVariables>(GqlLinkAccountDocument, options);
      }
export type GqlLinkAccountMutationHookResult = ReturnType<typeof useGqlLinkAccountMutation>;
export type GqlLinkAccountMutationResult = Apollo.MutationResult<GqlLinkAccountMutation>;
export type GqlLinkAccountMutationOptions = Apollo.BaseMutationOptions<GqlLinkAccountMutation, GqlLinkAccountMutationVariables>;
export const GqlUpdateCalendarTokenDocument = gql`
    mutation GQLUpdateCalendarToken($calendar: String = null, $refreshToken: String, $accessToken: String, $kennelID: Int, $userEmail: String) {
  update_kennels(
    where: {id: {_eq: $kennelID}, gm: {id: {}, email: {_eq: $userEmail}}}
    _set: {google_calendar: $calendar, google_refresh: $refreshToken, google_token: $accessToken}
  ) {
    returning {
      id
    }
  }
}
    `;
export type GqlUpdateCalendarTokenMutationFn = Apollo.MutationFunction<GqlUpdateCalendarTokenMutation, GqlUpdateCalendarTokenMutationVariables>;

/**
 * __useGqlUpdateCalendarTokenMutation__
 *
 * To run a mutation, you first call `useGqlUpdateCalendarTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateCalendarTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateCalendarTokenMutation, { data, loading, error }] = useGqlUpdateCalendarTokenMutation({
 *   variables: {
 *      calendar: // value for 'calendar'
 *      refreshToken: // value for 'refreshToken'
 *      accessToken: // value for 'accessToken'
 *      kennelID: // value for 'kennelID'
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useGqlUpdateCalendarTokenMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateCalendarTokenMutation, GqlUpdateCalendarTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateCalendarTokenMutation, GqlUpdateCalendarTokenMutationVariables>(GqlUpdateCalendarTokenDocument, options);
      }
export type GqlUpdateCalendarTokenMutationHookResult = ReturnType<typeof useGqlUpdateCalendarTokenMutation>;
export type GqlUpdateCalendarTokenMutationResult = Apollo.MutationResult<GqlUpdateCalendarTokenMutation>;
export type GqlUpdateCalendarTokenMutationOptions = Apollo.BaseMutationOptions<GqlUpdateCalendarTokenMutation, GqlUpdateCalendarTokenMutationVariables>;
export const GqlUpdateNoteDocument = gql`
    mutation GQLUpdateNote($note: String, $trailId: Int, $hasherId: Int) {
  update_attendance(
    where: {trail: {_eq: $trailId}, hasher: {_eq: $hasherId}}
    _set: {note: $note}
  ) {
    affected_rows
  }
}
    `;
export type GqlUpdateNoteMutationFn = Apollo.MutationFunction<GqlUpdateNoteMutation, GqlUpdateNoteMutationVariables>;

/**
 * __useGqlUpdateNoteMutation__
 *
 * To run a mutation, you first call `useGqlUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdateNoteMutation, { data, loading, error }] = useGqlUpdateNoteMutation({
 *   variables: {
 *      note: // value for 'note'
 *      trailId: // value for 'trailId'
 *      hasherId: // value for 'hasherId'
 *   },
 * });
 */
export function useGqlUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdateNoteMutation, GqlUpdateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdateNoteMutation, GqlUpdateNoteMutationVariables>(GqlUpdateNoteDocument, options);
      }
export type GqlUpdateNoteMutationHookResult = ReturnType<typeof useGqlUpdateNoteMutation>;
export type GqlUpdateNoteMutationResult = Apollo.MutationResult<GqlUpdateNoteMutation>;
export type GqlUpdateNoteMutationOptions = Apollo.BaseMutationOptions<GqlUpdateNoteMutation, GqlUpdateNoteMutationVariables>;
export const GqlUpdatePaidDocument = gql`
    mutation GQLUpdatePaid($hasherId: Int, $trailId: Int, $paid: Boolean, $attended: Boolean) {
  insert_attendance(
    objects: {hasher: $hasherId, trail: $trailId, paid: $paid, attended: $attended}
    on_conflict: {constraint: attendance_pkey, update_columns: [paid, attended]}
  ) {
    affected_rows
  }
}
    `;
export type GqlUpdatePaidMutationFn = Apollo.MutationFunction<GqlUpdatePaidMutation, GqlUpdatePaidMutationVariables>;

/**
 * __useGqlUpdatePaidMutation__
 *
 * To run a mutation, you first call `useGqlUpdatePaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdatePaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gqlUpdatePaidMutation, { data, loading, error }] = useGqlUpdatePaidMutation({
 *   variables: {
 *      hasherId: // value for 'hasherId'
 *      trailId: // value for 'trailId'
 *      paid: // value for 'paid'
 *      attended: // value for 'attended'
 *   },
 * });
 */
export function useGqlUpdatePaidMutation(baseOptions?: Apollo.MutationHookOptions<GqlUpdatePaidMutation, GqlUpdatePaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GqlUpdatePaidMutation, GqlUpdatePaidMutationVariables>(GqlUpdatePaidDocument, options);
      }
export type GqlUpdatePaidMutationHookResult = ReturnType<typeof useGqlUpdatePaidMutation>;
export type GqlUpdatePaidMutationResult = Apollo.MutationResult<GqlUpdatePaidMutation>;
export type GqlUpdatePaidMutationOptions = Apollo.BaseMutationOptions<GqlUpdatePaidMutation, GqlUpdatePaidMutationVariables>;
export const InsertTrailsDocument = gql`
    mutation InsertTrails($trails: [trails_insert_input!] = {}) {
  insert_trails(objects: $trails) {
    affected_rows
  }
}
    `;
export type InsertTrailsMutationFn = Apollo.MutationFunction<InsertTrailsMutation, InsertTrailsMutationVariables>;

/**
 * __useInsertTrailsMutation__
 *
 * To run a mutation, you first call `useInsertTrailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertTrailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertTrailsMutation, { data, loading, error }] = useInsertTrailsMutation({
 *   variables: {
 *      trails: // value for 'trails'
 *   },
 * });
 */
export function useInsertTrailsMutation(baseOptions?: Apollo.MutationHookOptions<InsertTrailsMutation, InsertTrailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertTrailsMutation, InsertTrailsMutationVariables>(InsertTrailsDocument, options);
      }
export type InsertTrailsMutationHookResult = ReturnType<typeof useInsertTrailsMutation>;
export type InsertTrailsMutationResult = Apollo.MutationResult<InsertTrailsMutation>;
export type InsertTrailsMutationOptions = Apollo.BaseMutationOptions<InsertTrailsMutation, InsertTrailsMutationVariables>;
export const UpdateKennelNextDocument = gql`
    mutation UpdateKennelNext($kennelId: Int!, $next: timestamptz!) {
  update_kennels_by_pk(pk_columns: {id: $kennelId}, _set: {next: $next}) {
    id
  }
}
    `;
export type UpdateKennelNextMutationFn = Apollo.MutationFunction<UpdateKennelNextMutation, UpdateKennelNextMutationVariables>;

/**
 * __useUpdateKennelNextMutation__
 *
 * To run a mutation, you first call `useUpdateKennelNextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateKennelNextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateKennelNextMutation, { data, loading, error }] = useUpdateKennelNextMutation({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *      next: // value for 'next'
 *   },
 * });
 */
export function useUpdateKennelNextMutation(baseOptions?: Apollo.MutationHookOptions<UpdateKennelNextMutation, UpdateKennelNextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateKennelNextMutation, UpdateKennelNextMutationVariables>(UpdateKennelNextDocument, options);
      }
export type UpdateKennelNextMutationHookResult = ReturnType<typeof useUpdateKennelNextMutation>;
export type UpdateKennelNextMutationResult = Apollo.MutationResult<UpdateKennelNextMutation>;
export type UpdateKennelNextMutationOptions = Apollo.BaseMutationOptions<UpdateKennelNextMutation, UpdateKennelNextMutationVariables>;
export const GqlHareRankDocument = gql`
    query GQLHareRank($kennelId: Int) {
  hashers(
    where: {name: {_is_null: false}, hares: {trailInfo: {kennel: {_eq: $kennelId}}}}
    limit: 50
  ) {
    name
    id
    hares_aggregate(where: {trailInfo: {kennel: {_eq: $kennelId}}}) {
      aggregate {
        count
      }
    }
  }
}
    `;

/**
 * __useGqlHareRankQuery__
 *
 * To run a query within a React component, call `useGqlHareRankQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlHareRankQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlHareRankQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlHareRankQuery(baseOptions?: Apollo.QueryHookOptions<GqlHareRankQuery, GqlHareRankQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlHareRankQuery, GqlHareRankQueryVariables>(GqlHareRankDocument, options);
      }
export function useGqlHareRankLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlHareRankQuery, GqlHareRankQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlHareRankQuery, GqlHareRankQueryVariables>(GqlHareRankDocument, options);
        }
export type GqlHareRankQueryHookResult = ReturnType<typeof useGqlHareRankQuery>;
export type GqlHareRankLazyQueryHookResult = ReturnType<typeof useGqlHareRankLazyQuery>;
export type GqlHareRankQueryResult = Apollo.QueryResult<GqlHareRankQuery, GqlHareRankQueryVariables>;
export const GqlGetKennelPageDocument = gql`
    query GQLGetKennelPage($kennelId: Int, $after: timestamptz) {
  kennels(limit: 1, where: {id: {_eq: $kennelId}}) {
    ...GQLGetKennelPageKennel
  }
}
    ${GqlGetKennelPageKennelFragmentDoc}`;

/**
 * __useGqlGetKennelPageQuery__
 *
 * To run a query within a React component, call `useGqlGetKennelPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetKennelPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetKennelPageQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGqlGetKennelPageQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetKennelPageQuery, GqlGetKennelPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetKennelPageQuery, GqlGetKennelPageQueryVariables>(GqlGetKennelPageDocument, options);
      }
export function useGqlGetKennelPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetKennelPageQuery, GqlGetKennelPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetKennelPageQuery, GqlGetKennelPageQueryVariables>(GqlGetKennelPageDocument, options);
        }
export type GqlGetKennelPageQueryHookResult = ReturnType<typeof useGqlGetKennelPageQuery>;
export type GqlGetKennelPageLazyQueryHookResult = ReturnType<typeof useGqlGetKennelPageLazyQuery>;
export type GqlGetKennelPageQueryResult = Apollo.QueryResult<GqlGetKennelPageQuery, GqlGetKennelPageQueryVariables>;
export const GqlMismanagementViewDocument = gql`
    query GQLMismanagementView($kennelId: Int) {
  management(where: {kennel: {_eq: $kennelId}}) {
    hasherInfo {
      name
      id
    }
    title
  }
}
    `;

/**
 * __useGqlMismanagementViewQuery__
 *
 * To run a query within a React component, call `useGqlMismanagementViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlMismanagementViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlMismanagementViewQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlMismanagementViewQuery(baseOptions?: Apollo.QueryHookOptions<GqlMismanagementViewQuery, GqlMismanagementViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlMismanagementViewQuery, GqlMismanagementViewQueryVariables>(GqlMismanagementViewDocument, options);
      }
export function useGqlMismanagementViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlMismanagementViewQuery, GqlMismanagementViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlMismanagementViewQuery, GqlMismanagementViewQueryVariables>(GqlMismanagementViewDocument, options);
        }
export type GqlMismanagementViewQueryHookResult = ReturnType<typeof useGqlMismanagementViewQuery>;
export type GqlMismanagementViewLazyQueryHookResult = ReturnType<typeof useGqlMismanagementViewLazyQuery>;
export type GqlMismanagementViewQueryResult = Apollo.QueryResult<GqlMismanagementViewQuery, GqlMismanagementViewQueryVariables>;
export const GqlFeedPageDocument = gql`
    query GQLFeedPage($limit: Int = 10, $kennels: [String!]) {
  trails(
    order_by: {start: asc}
    limit: $limit
    where: {draft: {_is_null: true}, start: {_gt: "now()"}, kennelInfo: {short_name: {_in: $kennels}}}
  ) {
    name
    id
    kennelInfo {
      short_name
    }
    start
  }
}
    `;

/**
 * __useGqlFeedPageQuery__
 *
 * To run a query within a React component, call `useGqlFeedPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlFeedPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlFeedPageQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      kennels: // value for 'kennels'
 *   },
 * });
 */
export function useGqlFeedPageQuery(baseOptions?: Apollo.QueryHookOptions<GqlFeedPageQuery, GqlFeedPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlFeedPageQuery, GqlFeedPageQueryVariables>(GqlFeedPageDocument, options);
      }
export function useGqlFeedPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlFeedPageQuery, GqlFeedPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlFeedPageQuery, GqlFeedPageQueryVariables>(GqlFeedPageDocument, options);
        }
export type GqlFeedPageQueryHookResult = ReturnType<typeof useGqlFeedPageQuery>;
export type GqlFeedPageLazyQueryHookResult = ReturnType<typeof useGqlFeedPageLazyQuery>;
export type GqlFeedPageQueryResult = Apollo.QueryResult<GqlFeedPageQuery, GqlFeedPageQueryVariables>;
export const GqlGetRefreshTokenDocument = gql`
    query GQLGetRefreshToken($accessToken: String) {
  kennels(where: {google_token: {_eq: $accessToken}}, limit: 1) {
    google_refresh
  }
}
    `;

/**
 * __useGqlGetRefreshTokenQuery__
 *
 * To run a query within a React component, call `useGqlGetRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetRefreshTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetRefreshTokenQuery({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useGqlGetRefreshTokenQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetRefreshTokenQuery, GqlGetRefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetRefreshTokenQuery, GqlGetRefreshTokenQueryVariables>(GqlGetRefreshTokenDocument, options);
      }
export function useGqlGetRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetRefreshTokenQuery, GqlGetRefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetRefreshTokenQuery, GqlGetRefreshTokenQueryVariables>(GqlGetRefreshTokenDocument, options);
        }
export type GqlGetRefreshTokenQueryHookResult = ReturnType<typeof useGqlGetRefreshTokenQuery>;
export type GqlGetRefreshTokenLazyQueryHookResult = ReturnType<typeof useGqlGetRefreshTokenLazyQuery>;
export type GqlGetRefreshTokenQueryResult = Apollo.QueryResult<GqlGetRefreshTokenQuery, GqlGetRefreshTokenQueryVariables>;
export const GqlHasherFromEmailDocument = gql`
    query GQLHasherFromEmail($email: String) {
  hashers(where: {email: {_like: $email}}, limit: 1) {
    id
    name
  }
}
    `;

/**
 * __useGqlHasherFromEmailQuery__
 *
 * To run a query within a React component, call `useGqlHasherFromEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlHasherFromEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlHasherFromEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGqlHasherFromEmailQuery(baseOptions?: Apollo.QueryHookOptions<GqlHasherFromEmailQuery, GqlHasherFromEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlHasherFromEmailQuery, GqlHasherFromEmailQueryVariables>(GqlHasherFromEmailDocument, options);
      }
export function useGqlHasherFromEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlHasherFromEmailQuery, GqlHasherFromEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlHasherFromEmailQuery, GqlHasherFromEmailQueryVariables>(GqlHasherFromEmailDocument, options);
        }
export type GqlHasherFromEmailQueryHookResult = ReturnType<typeof useGqlHasherFromEmailQuery>;
export type GqlHasherFromEmailLazyQueryHookResult = ReturnType<typeof useGqlHasherFromEmailLazyQuery>;
export type GqlHasherFromEmailQueryResult = Apollo.QueryResult<GqlHasherFromEmailQuery, GqlHasherFromEmailQueryVariables>;
export const GqlAcceptVerifyDocument = gql`
    query GQLAcceptVerify($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    draft
    kennel
    draftFor {
      id
      ...GQLHareCheckFragment
    }
  }
}
    ${GqlHareCheckFragmentFragmentDoc}`;

/**
 * __useGqlAcceptVerifyQuery__
 *
 * To run a query within a React component, call `useGqlAcceptVerifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlAcceptVerifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlAcceptVerifyQuery({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlAcceptVerifyQuery(baseOptions?: Apollo.QueryHookOptions<GqlAcceptVerifyQuery, GqlAcceptVerifyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlAcceptVerifyQuery, GqlAcceptVerifyQueryVariables>(GqlAcceptVerifyDocument, options);
      }
export function useGqlAcceptVerifyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlAcceptVerifyQuery, GqlAcceptVerifyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlAcceptVerifyQuery, GqlAcceptVerifyQueryVariables>(GqlAcceptVerifyDocument, options);
        }
export type GqlAcceptVerifyQueryHookResult = ReturnType<typeof useGqlAcceptVerifyQuery>;
export type GqlAcceptVerifyLazyQueryHookResult = ReturnType<typeof useGqlAcceptVerifyLazyQuery>;
export type GqlAcceptVerifyQueryResult = Apollo.QueryResult<GqlAcceptVerifyQuery, GqlAcceptVerifyQueryVariables>;
export const GqlDeleteVerifyDocument = gql`
    query GQLDeleteVerify($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}) {
    ...GQLHareCheckFragment
    kennel
    draft
  }
}
    ${GqlHareCheckFragmentFragmentDoc}`;

/**
 * __useGqlDeleteVerifyQuery__
 *
 * To run a query within a React component, call `useGqlDeleteVerifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlDeleteVerifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlDeleteVerifyQuery({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlDeleteVerifyQuery(baseOptions?: Apollo.QueryHookOptions<GqlDeleteVerifyQuery, GqlDeleteVerifyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlDeleteVerifyQuery, GqlDeleteVerifyQueryVariables>(GqlDeleteVerifyDocument, options);
      }
export function useGqlDeleteVerifyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlDeleteVerifyQuery, GqlDeleteVerifyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlDeleteVerifyQuery, GqlDeleteVerifyQueryVariables>(GqlDeleteVerifyDocument, options);
        }
export type GqlDeleteVerifyQueryHookResult = ReturnType<typeof useGqlDeleteVerifyQuery>;
export type GqlDeleteVerifyLazyQueryHookResult = ReturnType<typeof useGqlDeleteVerifyLazyQuery>;
export type GqlDeleteVerifyQueryResult = Apollo.QueryResult<GqlDeleteVerifyQuery, GqlDeleteVerifyQueryVariables>;
export const GqlEditTrailInfoDocument = gql`
    query GQLEditTrailInfo($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    ...GQLTrailInfo
    draftFor {
      ...GQLTrailInfo
    }
  }
}
    ${GqlTrailInfoFragmentDoc}`;

/**
 * __useGqlEditTrailInfoQuery__
 *
 * To run a query within a React component, call `useGqlEditTrailInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlEditTrailInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlEditTrailInfoQuery({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlEditTrailInfoQuery(baseOptions?: Apollo.QueryHookOptions<GqlEditTrailInfoQuery, GqlEditTrailInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlEditTrailInfoQuery, GqlEditTrailInfoQueryVariables>(GqlEditTrailInfoDocument, options);
      }
export function useGqlEditTrailInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlEditTrailInfoQuery, GqlEditTrailInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlEditTrailInfoQuery, GqlEditTrailInfoQueryVariables>(GqlEditTrailInfoDocument, options);
        }
export type GqlEditTrailInfoQueryHookResult = ReturnType<typeof useGqlEditTrailInfoQuery>;
export type GqlEditTrailInfoLazyQueryHookResult = ReturnType<typeof useGqlEditTrailInfoLazyQuery>;
export type GqlEditTrailInfoQueryResult = Apollo.QueryResult<GqlEditTrailInfoQuery, GqlEditTrailInfoQueryVariables>;
export const GqlHasherEmailDocument = gql`
    query GQLHasherEmail($hasher: Int) {
  hashers(limit: 1, where: {id: {_eq: $hasher}}) {
    email
  }
}
    `;

/**
 * __useGqlHasherEmailQuery__
 *
 * To run a query within a React component, call `useGqlHasherEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlHasherEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlHasherEmailQuery({
 *   variables: {
 *      hasher: // value for 'hasher'
 *   },
 * });
 */
export function useGqlHasherEmailQuery(baseOptions?: Apollo.QueryHookOptions<GqlHasherEmailQuery, GqlHasherEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlHasherEmailQuery, GqlHasherEmailQueryVariables>(GqlHasherEmailDocument, options);
      }
export function useGqlHasherEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlHasherEmailQuery, GqlHasherEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlHasherEmailQuery, GqlHasherEmailQueryVariables>(GqlHasherEmailDocument, options);
        }
export type GqlHasherEmailQueryHookResult = ReturnType<typeof useGqlHasherEmailQuery>;
export type GqlHasherEmailLazyQueryHookResult = ReturnType<typeof useGqlHasherEmailLazyQuery>;
export type GqlHasherEmailQueryResult = Apollo.QueryResult<GqlHasherEmailQuery, GqlHasherEmailQueryVariables>;
export const GqlInviteTrailInfoDocument = gql`
    query GQLInviteTrailInfo($trailId: Int) {
  trails(limit: 1, where: {id: {_eq: $trailId}}) {
    kennelInfo {
      name
    }
    name
    start
    hares {
      hasherInfo {
        name
      }
    }
  }
}
    `;

/**
 * __useGqlInviteTrailInfoQuery__
 *
 * To run a query within a React component, call `useGqlInviteTrailInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlInviteTrailInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlInviteTrailInfoQuery({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlInviteTrailInfoQuery(baseOptions?: Apollo.QueryHookOptions<GqlInviteTrailInfoQuery, GqlInviteTrailInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlInviteTrailInfoQuery, GqlInviteTrailInfoQueryVariables>(GqlInviteTrailInfoDocument, options);
      }
export function useGqlInviteTrailInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlInviteTrailInfoQuery, GqlInviteTrailInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlInviteTrailInfoQuery, GqlInviteTrailInfoQueryVariables>(GqlInviteTrailInfoDocument, options);
        }
export type GqlInviteTrailInfoQueryHookResult = ReturnType<typeof useGqlInviteTrailInfoQuery>;
export type GqlInviteTrailInfoLazyQueryHookResult = ReturnType<typeof useGqlInviteTrailInfoLazyQuery>;
export type GqlInviteTrailInfoQueryResult = Apollo.QueryResult<GqlInviteTrailInfoQuery, GqlInviteTrailInfoQueryVariables>;
export const GqlKennelIdForTrailDocument = gql`
    query GQLKennelIdForTrail($trailId: Int) {
  trails(limit: 1, where: {id: {_eq: $trailId}}) {
    kennel
  }
}
    `;

/**
 * __useGqlKennelIdForTrailQuery__
 *
 * To run a query within a React component, call `useGqlKennelIdForTrailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlKennelIdForTrailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlKennelIdForTrailQuery({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlKennelIdForTrailQuery(baseOptions?: Apollo.QueryHookOptions<GqlKennelIdForTrailQuery, GqlKennelIdForTrailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlKennelIdForTrailQuery, GqlKennelIdForTrailQueryVariables>(GqlKennelIdForTrailDocument, options);
      }
export function useGqlKennelIdForTrailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlKennelIdForTrailQuery, GqlKennelIdForTrailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlKennelIdForTrailQuery, GqlKennelIdForTrailQueryVariables>(GqlKennelIdForTrailDocument, options);
        }
export type GqlKennelIdForTrailQueryHookResult = ReturnType<typeof useGqlKennelIdForTrailQuery>;
export type GqlKennelIdForTrailLazyQueryHookResult = ReturnType<typeof useGqlKennelIdForTrailLazyQuery>;
export type GqlKennelIdForTrailQueryResult = Apollo.QueryResult<GqlKennelIdForTrailQuery, GqlKennelIdForTrailQueryVariables>;
export const GqlHasherInfoServerDocument = gql`
    query GQLHasherInfoServer($hasherId: Int) {
  hashers(limit: 1, where: {id: {_eq: $hasherId}}) {
    name
  }
}
    `;

/**
 * __useGqlHasherInfoServerQuery__
 *
 * To run a query within a React component, call `useGqlHasherInfoServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlHasherInfoServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlHasherInfoServerQuery({
 *   variables: {
 *      hasherId: // value for 'hasherId'
 *   },
 * });
 */
export function useGqlHasherInfoServerQuery(baseOptions?: Apollo.QueryHookOptions<GqlHasherInfoServerQuery, GqlHasherInfoServerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlHasherInfoServerQuery, GqlHasherInfoServerQueryVariables>(GqlHasherInfoServerDocument, options);
      }
export function useGqlHasherInfoServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlHasherInfoServerQuery, GqlHasherInfoServerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlHasherInfoServerQuery, GqlHasherInfoServerQueryVariables>(GqlHasherInfoServerDocument, options);
        }
export type GqlHasherInfoServerQueryHookResult = ReturnType<typeof useGqlHasherInfoServerQuery>;
export type GqlHasherInfoServerLazyQueryHookResult = ReturnType<typeof useGqlHasherInfoServerLazyQuery>;
export type GqlHasherInfoServerQueryResult = Apollo.QueryResult<GqlHasherInfoServerQuery, GqlHasherInfoServerQueryVariables>;
export const GqlGetKennelsDocument = gql`
    query GQLGetKennels {
  kennels(order_by: {id: asc}) {
    ...GQLGetKennelsKennel
  }
}
    ${GqlGetKennelsKennelFragmentDoc}`;

/**
 * __useGqlGetKennelsQuery__
 *
 * To run a query within a React component, call `useGqlGetKennelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetKennelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetKennelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGqlGetKennelsQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetKennelsQuery, GqlGetKennelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetKennelsQuery, GqlGetKennelsQueryVariables>(GqlGetKennelsDocument, options);
      }
export function useGqlGetKennelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetKennelsQuery, GqlGetKennelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetKennelsQuery, GqlGetKennelsQueryVariables>(GqlGetKennelsDocument, options);
        }
export type GqlGetKennelsQueryHookResult = ReturnType<typeof useGqlGetKennelsQuery>;
export type GqlGetKennelsLazyQueryHookResult = ReturnType<typeof useGqlGetKennelsLazyQuery>;
export type GqlGetKennelsQueryResult = Apollo.QueryResult<GqlGetKennelsQuery, GqlGetKennelsQueryVariables>;
export const GqlPermissionsEnumDocument = gql`
    query GQLPermissionsEnum {
  permission_enum {
    description
    permission
  }
}
    `;

/**
 * __useGqlPermissionsEnumQuery__
 *
 * To run a query within a React component, call `useGqlPermissionsEnumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlPermissionsEnumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlPermissionsEnumQuery({
 *   variables: {
 *   },
 * });
 */
export function useGqlPermissionsEnumQuery(baseOptions?: Apollo.QueryHookOptions<GqlPermissionsEnumQuery, GqlPermissionsEnumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlPermissionsEnumQuery, GqlPermissionsEnumQueryVariables>(GqlPermissionsEnumDocument, options);
      }
export function useGqlPermissionsEnumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlPermissionsEnumQuery, GqlPermissionsEnumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlPermissionsEnumQuery, GqlPermissionsEnumQueryVariables>(GqlPermissionsEnumDocument, options);
        }
export type GqlPermissionsEnumQueryHookResult = ReturnType<typeof useGqlPermissionsEnumQuery>;
export type GqlPermissionsEnumLazyQueryHookResult = ReturnType<typeof useGqlPermissionsEnumLazyQuery>;
export type GqlPermissionsEnumQueryResult = Apollo.QueryResult<GqlPermissionsEnumQuery, GqlPermissionsEnumQueryVariables>;
export const GqlGetHasherNamesDocument = gql`
    query GQLGetHasherNames {
  hashers(where: {name: {_is_null: false}}, order_by: {name: asc}) {
    ...PublicHasherInfo
  }
}
    ${PublicHasherInfoFragmentDoc}`;

/**
 * __useGqlGetHasherNamesQuery__
 *
 * To run a query within a React component, call `useGqlGetHasherNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetHasherNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetHasherNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGqlGetHasherNamesQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetHasherNamesQuery, GqlGetHasherNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetHasherNamesQuery, GqlGetHasherNamesQueryVariables>(GqlGetHasherNamesDocument, options);
      }
export function useGqlGetHasherNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetHasherNamesQuery, GqlGetHasherNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetHasherNamesQuery, GqlGetHasherNamesQueryVariables>(GqlGetHasherNamesDocument, options);
        }
export type GqlGetHasherNamesQueryHookResult = ReturnType<typeof useGqlGetHasherNamesQuery>;
export type GqlGetHasherNamesLazyQueryHookResult = ReturnType<typeof useGqlGetHasherNamesLazyQuery>;
export type GqlGetHasherNamesQueryResult = Apollo.QueryResult<GqlGetHasherNamesQuery, GqlGetHasherNamesQueryVariables>;
export const GqlKennelEditPartDocument = gql`
    query GQLKennelEditPart($kennelId: Int = 10) {
  kennels(limit: 1, where: {id: {_eq: $kennelId}}) {
    ...GQLNext
    area
    description
    frequency
    name
    short_name
    web
    next
    price
  }
}
    ${GqlNextFragmentDoc}`;

/**
 * __useGqlKennelEditPartQuery__
 *
 * To run a query within a React component, call `useGqlKennelEditPartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlKennelEditPartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlKennelEditPartQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlKennelEditPartQuery(baseOptions?: Apollo.QueryHookOptions<GqlKennelEditPartQuery, GqlKennelEditPartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlKennelEditPartQuery, GqlKennelEditPartQueryVariables>(GqlKennelEditPartDocument, options);
      }
export function useGqlKennelEditPartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlKennelEditPartQuery, GqlKennelEditPartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlKennelEditPartQuery, GqlKennelEditPartQueryVariables>(GqlKennelEditPartDocument, options);
        }
export type GqlKennelEditPartQueryHookResult = ReturnType<typeof useGqlKennelEditPartQuery>;
export type GqlKennelEditPartLazyQueryHookResult = ReturnType<typeof useGqlKennelEditPartLazyQuery>;
export type GqlKennelEditPartQueryResult = Apollo.QueryResult<GqlKennelEditPartQuery, GqlKennelEditPartQueryVariables>;
export const GqlKennelEditPageSsrDocument = gql`
    query GQLKennelEditPageSSR($kennelId: Int, $email: String) {
  kennels(where: {id: {_eq: $kennelId}, gm: {email: {_eq: $email}}}, limit: 1) {
    ...GQLKennelEditPageKennel
  }
}
    ${GqlKennelEditPageKennelFragmentDoc}`;

/**
 * __useGqlKennelEditPageSsrQuery__
 *
 * To run a query within a React component, call `useGqlKennelEditPageSsrQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlKennelEditPageSsrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlKennelEditPageSsrQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGqlKennelEditPageSsrQuery(baseOptions?: Apollo.QueryHookOptions<GqlKennelEditPageSsrQuery, GqlKennelEditPageSsrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlKennelEditPageSsrQuery, GqlKennelEditPageSsrQueryVariables>(GqlKennelEditPageSsrDocument, options);
      }
export function useGqlKennelEditPageSsrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlKennelEditPageSsrQuery, GqlKennelEditPageSsrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlKennelEditPageSsrQuery, GqlKennelEditPageSsrQueryVariables>(GqlKennelEditPageSsrDocument, options);
        }
export type GqlKennelEditPageSsrQueryHookResult = ReturnType<typeof useGqlKennelEditPageSsrQuery>;
export type GqlKennelEditPageSsrLazyQueryHookResult = ReturnType<typeof useGqlKennelEditPageSsrLazyQuery>;
export type GqlKennelEditPageSsrQueryResult = Apollo.QueryResult<GqlKennelEditPageSsrQuery, GqlKennelEditPageSsrQueryVariables>;
export const GqlPageTrailIdDocument = gql`
    query GQLPageTrailId($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    ...PublicFragmentTrail
  }
}
    ${PublicFragmentTrailFragmentDoc}`;

/**
 * __useGqlPageTrailIdQuery__
 *
 * To run a query within a React component, call `useGqlPageTrailIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlPageTrailIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlPageTrailIdQuery({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlPageTrailIdQuery(baseOptions?: Apollo.QueryHookOptions<GqlPageTrailIdQuery, GqlPageTrailIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlPageTrailIdQuery, GqlPageTrailIdQueryVariables>(GqlPageTrailIdDocument, options);
      }
export function useGqlPageTrailIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlPageTrailIdQuery, GqlPageTrailIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlPageTrailIdQuery, GqlPageTrailIdQueryVariables>(GqlPageTrailIdDocument, options);
        }
export type GqlPageTrailIdQueryHookResult = ReturnType<typeof useGqlPageTrailIdQuery>;
export type GqlPageTrailIdLazyQueryHookResult = ReturnType<typeof useGqlPageTrailIdLazyQuery>;
export type GqlPageTrailIdQueryResult = Apollo.QueryResult<GqlPageTrailIdQuery, GqlPageTrailIdQueryVariables>;
export const GqlPageTrailsDocument = gql`
    query GQLPageTrails($after: timestamptz = "now()", $limit: Int, $filters: [Int!]) {
  trails(
    limit: $limit
    order_by: {start: asc}
    where: {start: {_gt: $after}, draft: {_is_null: true}, kennel: {_nin: $filters}}
  ) {
    ...GQLPageTrail
  }
}
    ${GqlPageTrailFragmentDoc}`;

/**
 * __useGqlPageTrailsQuery__
 *
 * To run a query within a React component, call `useGqlPageTrailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlPageTrailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlPageTrailsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      limit: // value for 'limit'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGqlPageTrailsQuery(baseOptions?: Apollo.QueryHookOptions<GqlPageTrailsQuery, GqlPageTrailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlPageTrailsQuery, GqlPageTrailsQueryVariables>(GqlPageTrailsDocument, options);
      }
export function useGqlPageTrailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlPageTrailsQuery, GqlPageTrailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlPageTrailsQuery, GqlPageTrailsQueryVariables>(GqlPageTrailsDocument, options);
        }
export type GqlPageTrailsQueryHookResult = ReturnType<typeof useGqlPageTrailsQuery>;
export type GqlPageTrailsLazyQueryHookResult = ReturnType<typeof useGqlPageTrailsLazyQuery>;
export type GqlPageTrailsQueryResult = Apollo.QueryResult<GqlPageTrailsQuery, GqlPageTrailsQueryVariables>;
export const GqlTrailIndexPreloadDocument = gql`
    query GQLTrailIndexPreload {
  kennels {
    ...GQLKennelInfo
  }
}
    ${GqlKennelInfoFragmentDoc}`;

/**
 * __useGqlTrailIndexPreloadQuery__
 *
 * To run a query within a React component, call `useGqlTrailIndexPreloadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlTrailIndexPreloadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlTrailIndexPreloadQuery({
 *   variables: {
 *   },
 * });
 */
export function useGqlTrailIndexPreloadQuery(baseOptions?: Apollo.QueryHookOptions<GqlTrailIndexPreloadQuery, GqlTrailIndexPreloadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlTrailIndexPreloadQuery, GqlTrailIndexPreloadQueryVariables>(GqlTrailIndexPreloadDocument, options);
      }
export function useGqlTrailIndexPreloadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlTrailIndexPreloadQuery, GqlTrailIndexPreloadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlTrailIndexPreloadQuery, GqlTrailIndexPreloadQueryVariables>(GqlTrailIndexPreloadDocument, options);
        }
export type GqlTrailIndexPreloadQueryHookResult = ReturnType<typeof useGqlTrailIndexPreloadQuery>;
export type GqlTrailIndexPreloadLazyQueryHookResult = ReturnType<typeof useGqlTrailIndexPreloadLazyQuery>;
export type GqlTrailIndexPreloadQueryResult = Apollo.QueryResult<GqlTrailIndexPreloadQuery, GqlTrailIndexPreloadQueryVariables>;
export const GqlPageHasherHaresDocument = gql`
    query GQLPageHasherHares($hasherId: Int) {
  kennels(order_by: {trails_aggregate: {count: desc}}) {
    id
    short_name
    trails_aggregate(where: {hares: {hasher: {_eq: $hasherId}}}) {
      aggregate {
        count
      }
    }
  }
}
    `;

/**
 * __useGqlPageHasherHaresQuery__
 *
 * To run a query within a React component, call `useGqlPageHasherHaresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlPageHasherHaresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlPageHasherHaresQuery({
 *   variables: {
 *      hasherId: // value for 'hasherId'
 *   },
 * });
 */
export function useGqlPageHasherHaresQuery(baseOptions?: Apollo.QueryHookOptions<GqlPageHasherHaresQuery, GqlPageHasherHaresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlPageHasherHaresQuery, GqlPageHasherHaresQueryVariables>(GqlPageHasherHaresDocument, options);
      }
export function useGqlPageHasherHaresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlPageHasherHaresQuery, GqlPageHasherHaresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlPageHasherHaresQuery, GqlPageHasherHaresQueryVariables>(GqlPageHasherHaresDocument, options);
        }
export type GqlPageHasherHaresQueryHookResult = ReturnType<typeof useGqlPageHasherHaresQuery>;
export type GqlPageHasherHaresLazyQueryHookResult = ReturnType<typeof useGqlPageHasherHaresLazyQuery>;
export type GqlPageHasherHaresQueryResult = Apollo.QueryResult<GqlPageHasherHaresQuery, GqlPageHasherHaresQueryVariables>;
export const GqlHasherInfoClientDocument = gql`
    query GQLHasherInfoClient($hasherId: Int) {
  hashers(limit: 1, where: {id: {_eq: $hasherId}}) {
    name
    gm {
      ...GQLKennelList
    }
    management {
      ...GQLHasherManagement
    }
    attendance_aggregate(where: {attended: {_eq: true}}) {
      aggregate {
        count
      }
    }
  }
}
    ${GqlKennelListFragmentDoc}
${GqlHasherManagementFragmentDoc}`;

/**
 * __useGqlHasherInfoClientQuery__
 *
 * To run a query within a React component, call `useGqlHasherInfoClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlHasherInfoClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlHasherInfoClientQuery({
 *   variables: {
 *      hasherId: // value for 'hasherId'
 *   },
 * });
 */
export function useGqlHasherInfoClientQuery(baseOptions?: Apollo.QueryHookOptions<GqlHasherInfoClientQuery, GqlHasherInfoClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlHasherInfoClientQuery, GqlHasherInfoClientQueryVariables>(GqlHasherInfoClientDocument, options);
      }
export function useGqlHasherInfoClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlHasherInfoClientQuery, GqlHasherInfoClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlHasherInfoClientQuery, GqlHasherInfoClientQueryVariables>(GqlHasherInfoClientDocument, options);
        }
export type GqlHasherInfoClientQueryHookResult = ReturnType<typeof useGqlHasherInfoClientQuery>;
export type GqlHasherInfoClientLazyQueryHookResult = ReturnType<typeof useGqlHasherInfoClientLazyQuery>;
export type GqlHasherInfoClientQueryResult = Apollo.QueryResult<GqlHasherInfoClientQuery, GqlHasherInfoClientQueryVariables>;
export const GqlKennelPermissionCheckDocument = gql`
    query GQLKennelPermissionCheck($kennelID: Int, $permission: permission_enum_enum, $userId: Int) {
  management(
    where: {kennel: {_eq: $kennelID}, permissions: {permission: {_eq: $permission}}, hasher: {_eq: $userId}}
  ) {
    id
  }
}
    `;

/**
 * __useGqlKennelPermissionCheckQuery__
 *
 * To run a query within a React component, call `useGqlKennelPermissionCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlKennelPermissionCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlKennelPermissionCheckQuery({
 *   variables: {
 *      kennelID: // value for 'kennelID'
 *      permission: // value for 'permission'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGqlKennelPermissionCheckQuery(baseOptions?: Apollo.QueryHookOptions<GqlKennelPermissionCheckQuery, GqlKennelPermissionCheckQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlKennelPermissionCheckQuery, GqlKennelPermissionCheckQueryVariables>(GqlKennelPermissionCheckDocument, options);
      }
export function useGqlKennelPermissionCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlKennelPermissionCheckQuery, GqlKennelPermissionCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlKennelPermissionCheckQuery, GqlKennelPermissionCheckQueryVariables>(GqlKennelPermissionCheckDocument, options);
        }
export type GqlKennelPermissionCheckQueryHookResult = ReturnType<typeof useGqlKennelPermissionCheckQuery>;
export type GqlKennelPermissionCheckLazyQueryHookResult = ReturnType<typeof useGqlKennelPermissionCheckLazyQuery>;
export type GqlKennelPermissionCheckQueryResult = Apollo.QueryResult<GqlKennelPermissionCheckQuery, GqlKennelPermissionCheckQueryVariables>;
export const GqlUserPermsDocument = gql`
    query GQLUserPerms($hasherId: Int, $kennelId: Int) {
  management(where: {hasher: {_eq: $hasherId}, kennel: {_eq: $kennelId}}) {
    permissions {
      permission
    }
  }
}
    `;

/**
 * __useGqlUserPermsQuery__
 *
 * To run a query within a React component, call `useGqlUserPermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlUserPermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlUserPermsQuery({
 *   variables: {
 *      hasherId: // value for 'hasherId'
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlUserPermsQuery(baseOptions?: Apollo.QueryHookOptions<GqlUserPermsQuery, GqlUserPermsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlUserPermsQuery, GqlUserPermsQueryVariables>(GqlUserPermsDocument, options);
      }
export function useGqlUserPermsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlUserPermsQuery, GqlUserPermsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlUserPermsQuery, GqlUserPermsQueryVariables>(GqlUserPermsDocument, options);
        }
export type GqlUserPermsQueryHookResult = ReturnType<typeof useGqlUserPermsQuery>;
export type GqlUserPermsLazyQueryHookResult = ReturnType<typeof useGqlUserPermsLazyQuery>;
export type GqlUserPermsQueryResult = Apollo.QueryResult<GqlUserPermsQuery, GqlUserPermsQueryVariables>;
export const GqlVerifyCalendarAdminDocument = gql`
    query GQLVerifyCalendarAdmin($kennelId: Int, $email: String) {
  kennels(where: {id: {_eq: $kennelId}, gm_email: {_eq: $email}}, limit: 1) {
    id
  }
}
    `;

/**
 * __useGqlVerifyCalendarAdminQuery__
 *
 * To run a query within a React component, call `useGqlVerifyCalendarAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlVerifyCalendarAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlVerifyCalendarAdminQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGqlVerifyCalendarAdminQuery(baseOptions?: Apollo.QueryHookOptions<GqlVerifyCalendarAdminQuery, GqlVerifyCalendarAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlVerifyCalendarAdminQuery, GqlVerifyCalendarAdminQueryVariables>(GqlVerifyCalendarAdminDocument, options);
      }
export function useGqlVerifyCalendarAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlVerifyCalendarAdminQuery, GqlVerifyCalendarAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlVerifyCalendarAdminQuery, GqlVerifyCalendarAdminQueryVariables>(GqlVerifyCalendarAdminDocument, options);
        }
export type GqlVerifyCalendarAdminQueryHookResult = ReturnType<typeof useGqlVerifyCalendarAdminQuery>;
export type GqlVerifyCalendarAdminLazyQueryHookResult = ReturnType<typeof useGqlVerifyCalendarAdminLazyQuery>;
export type GqlVerifyCalendarAdminQueryResult = Apollo.QueryResult<GqlVerifyCalendarAdminQuery, GqlVerifyCalendarAdminQueryVariables>;
export const GqlRefreshKennelAddCountDocument = gql`
    query GQLRefreshKennelAddCount($kennelID: Int) {
  kennels(
    where: {id: {_eq: $kennelID}, google_refresh: {_is_null: false}, google_calendar: {_is_null: false}, google_token: {_is_null: false}}
  ) {
    ...GQLKennelAddInfo
    trails_aggregate(
      where: {google_calendar: {_is_null: true}, kennel: {_eq: $kennelID}, start: {_is_null: false}, draft: {_is_null: true}}
    ) {
      aggregate {
        count
      }
    }
  }
}
    ${GqlKennelAddInfoFragmentDoc}`;

/**
 * __useGqlRefreshKennelAddCountQuery__
 *
 * To run a query within a React component, call `useGqlRefreshKennelAddCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlRefreshKennelAddCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlRefreshKennelAddCountQuery({
 *   variables: {
 *      kennelID: // value for 'kennelID'
 *   },
 * });
 */
export function useGqlRefreshKennelAddCountQuery(baseOptions?: Apollo.QueryHookOptions<GqlRefreshKennelAddCountQuery, GqlRefreshKennelAddCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlRefreshKennelAddCountQuery, GqlRefreshKennelAddCountQueryVariables>(GqlRefreshKennelAddCountDocument, options);
      }
export function useGqlRefreshKennelAddCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlRefreshKennelAddCountQuery, GqlRefreshKennelAddCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlRefreshKennelAddCountQuery, GqlRefreshKennelAddCountQueryVariables>(GqlRefreshKennelAddCountDocument, options);
        }
export type GqlRefreshKennelAddCountQueryHookResult = ReturnType<typeof useGqlRefreshKennelAddCountQuery>;
export type GqlRefreshKennelAddCountLazyQueryHookResult = ReturnType<typeof useGqlRefreshKennelAddCountLazyQuery>;
export type GqlRefreshKennelAddCountQueryResult = Apollo.QueryResult<GqlRefreshKennelAddCountQuery, GqlRefreshKennelAddCountQueryVariables>;
export const GqlAddToCalendarDocument = gql`
    query GQLAddToCalendar($kennelID: Int, $limit: Int) {
  trails(
    where: {google_calendar: {_is_null: true}, kennel: {_eq: $kennelID}, start: {_is_null: false}, draft: {_is_null: true}}
    limit: $limit
  ) {
    ...GQLInsertTrail
  }
}
    ${GqlInsertTrailFragmentDoc}`;

/**
 * __useGqlAddToCalendarQuery__
 *
 * To run a query within a React component, call `useGqlAddToCalendarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlAddToCalendarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlAddToCalendarQuery({
 *   variables: {
 *      kennelID: // value for 'kennelID'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGqlAddToCalendarQuery(baseOptions?: Apollo.QueryHookOptions<GqlAddToCalendarQuery, GqlAddToCalendarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlAddToCalendarQuery, GqlAddToCalendarQueryVariables>(GqlAddToCalendarDocument, options);
      }
export function useGqlAddToCalendarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlAddToCalendarQuery, GqlAddToCalendarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlAddToCalendarQuery, GqlAddToCalendarQueryVariables>(GqlAddToCalendarDocument, options);
        }
export type GqlAddToCalendarQueryHookResult = ReturnType<typeof useGqlAddToCalendarQuery>;
export type GqlAddToCalendarLazyQueryHookResult = ReturnType<typeof useGqlAddToCalendarLazyQuery>;
export type GqlAddToCalendarQueryResult = Apollo.QueryResult<GqlAddToCalendarQuery, GqlAddToCalendarQueryVariables>;
export const GqlCalendarUpdateDocument = gql`
    query GQLCalendarUpdate($kennelId: Int) {
  trails(
    where: {draft: {_is_null: true}, kennel: {_eq: $kennelId}, _and: {gcal_dirty: {_eq: true}}, hares: {hasher: {_is_null: false}}}
  ) {
    ...GQLInsertTrail
    google_calendar
    gcal_dirty
    kennelInfo {
      ...GQLKennelAddInfo
    }
  }
}
    ${GqlInsertTrailFragmentDoc}
${GqlKennelAddInfoFragmentDoc}`;

/**
 * __useGqlCalendarUpdateQuery__
 *
 * To run a query within a React component, call `useGqlCalendarUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlCalendarUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlCalendarUpdateQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlCalendarUpdateQuery(baseOptions?: Apollo.QueryHookOptions<GqlCalendarUpdateQuery, GqlCalendarUpdateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlCalendarUpdateQuery, GqlCalendarUpdateQueryVariables>(GqlCalendarUpdateDocument, options);
      }
export function useGqlCalendarUpdateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlCalendarUpdateQuery, GqlCalendarUpdateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlCalendarUpdateQuery, GqlCalendarUpdateQueryVariables>(GqlCalendarUpdateDocument, options);
        }
export type GqlCalendarUpdateQueryHookResult = ReturnType<typeof useGqlCalendarUpdateQuery>;
export type GqlCalendarUpdateLazyQueryHookResult = ReturnType<typeof useGqlCalendarUpdateLazyQuery>;
export type GqlCalendarUpdateQueryResult = Apollo.QueryResult<GqlCalendarUpdateQuery, GqlCalendarUpdateQueryVariables>;
export const GqlGetGoogleCalendarIdDocument = gql`
    query GQLGetGoogleCalendarId($kennelId: Int) {
  kennels(where: {id: {_eq: $kennelId}}, limit: 1) {
    google_calendar
    google_refresh
    google_token
  }
}
    `;

/**
 * __useGqlGetGoogleCalendarIdQuery__
 *
 * To run a query within a React component, call `useGqlGetGoogleCalendarIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetGoogleCalendarIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetGoogleCalendarIdQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlGetGoogleCalendarIdQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetGoogleCalendarIdQuery, GqlGetGoogleCalendarIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetGoogleCalendarIdQuery, GqlGetGoogleCalendarIdQueryVariables>(GqlGetGoogleCalendarIdDocument, options);
      }
export function useGqlGetGoogleCalendarIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetGoogleCalendarIdQuery, GqlGetGoogleCalendarIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetGoogleCalendarIdQuery, GqlGetGoogleCalendarIdQueryVariables>(GqlGetGoogleCalendarIdDocument, options);
        }
export type GqlGetGoogleCalendarIdQueryHookResult = ReturnType<typeof useGqlGetGoogleCalendarIdQuery>;
export type GqlGetGoogleCalendarIdLazyQueryHookResult = ReturnType<typeof useGqlGetGoogleCalendarIdLazyQuery>;
export type GqlGetGoogleCalendarIdQueryResult = Apollo.QueryResult<GqlGetGoogleCalendarIdQuery, GqlGetGoogleCalendarIdQueryVariables>;
export const GqlCountSetCalendarEntriesDocument = gql`
    query GQLCountSetCalendarEntries($kennelId: Int) {
  trails_aggregate(
    where: {kennel: {_eq: $kennelId}, google_calendar: {_is_null: false}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGqlCountSetCalendarEntriesQuery__
 *
 * To run a query within a React component, call `useGqlCountSetCalendarEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlCountSetCalendarEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlCountSetCalendarEntriesQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlCountSetCalendarEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GqlCountSetCalendarEntriesQuery, GqlCountSetCalendarEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlCountSetCalendarEntriesQuery, GqlCountSetCalendarEntriesQueryVariables>(GqlCountSetCalendarEntriesDocument, options);
      }
export function useGqlCountSetCalendarEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlCountSetCalendarEntriesQuery, GqlCountSetCalendarEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlCountSetCalendarEntriesQuery, GqlCountSetCalendarEntriesQueryVariables>(GqlCountSetCalendarEntriesDocument, options);
        }
export type GqlCountSetCalendarEntriesQueryHookResult = ReturnType<typeof useGqlCountSetCalendarEntriesQuery>;
export type GqlCountSetCalendarEntriesLazyQueryHookResult = ReturnType<typeof useGqlCountSetCalendarEntriesLazyQuery>;
export type GqlCountSetCalendarEntriesQueryResult = Apollo.QueryResult<GqlCountSetCalendarEntriesQuery, GqlCountSetCalendarEntriesQueryVariables>;
export const GqlAllSetCalendarEntriesDocument = gql`
    query GQLAllSetCalendarEntries($kennelId: Int, $limit: Int) {
  trails(
    where: {kennel: {_eq: $kennelId}, google_calendar: {_is_null: false}}
    limit: $limit
  ) {
    google_calendar
    id
  }
}
    `;

/**
 * __useGqlAllSetCalendarEntriesQuery__
 *
 * To run a query within a React component, call `useGqlAllSetCalendarEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlAllSetCalendarEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlAllSetCalendarEntriesQuery({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGqlAllSetCalendarEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GqlAllSetCalendarEntriesQuery, GqlAllSetCalendarEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlAllSetCalendarEntriesQuery, GqlAllSetCalendarEntriesQueryVariables>(GqlAllSetCalendarEntriesDocument, options);
      }
export function useGqlAllSetCalendarEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlAllSetCalendarEntriesQuery, GqlAllSetCalendarEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlAllSetCalendarEntriesQuery, GqlAllSetCalendarEntriesQueryVariables>(GqlAllSetCalendarEntriesDocument, options);
        }
export type GqlAllSetCalendarEntriesQueryHookResult = ReturnType<typeof useGqlAllSetCalendarEntriesQuery>;
export type GqlAllSetCalendarEntriesLazyQueryHookResult = ReturnType<typeof useGqlAllSetCalendarEntriesLazyQuery>;
export type GqlAllSetCalendarEntriesQueryResult = Apollo.QueryResult<GqlAllSetCalendarEntriesQuery, GqlAllSetCalendarEntriesQueryVariables>;
export const GqlGetUserByEmailDocument = gql`
    query GQLGetUserByEmail($email: String) {
  hashers(where: {email: {_eq: $email}}) {
    id
    email
    name
    email_verified
  }
}
    `;

/**
 * __useGqlGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGqlGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGqlGetUserByEmailQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetUserByEmailQuery, GqlGetUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetUserByEmailQuery, GqlGetUserByEmailQueryVariables>(GqlGetUserByEmailDocument, options);
      }
export function useGqlGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetUserByEmailQuery, GqlGetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetUserByEmailQuery, GqlGetUserByEmailQueryVariables>(GqlGetUserByEmailDocument, options);
        }
export type GqlGetUserByEmailQueryHookResult = ReturnType<typeof useGqlGetUserByEmailQuery>;
export type GqlGetUserByEmailLazyQueryHookResult = ReturnType<typeof useGqlGetUserByEmailLazyQuery>;
export type GqlGetUserByEmailQueryResult = Apollo.QueryResult<GqlGetUserByEmailQuery, GqlGetUserByEmailQueryVariables>;
export const GqlCheckVerificationTokenDocument = gql`
    query GQLCheckVerificationToken($identifier: String, $token: String) {
  hashers(where: {email: {_eq: $identifier}, login: {_eq: $token}}) {
    login_expires
  }
}
    `;

/**
 * __useGqlCheckVerificationTokenQuery__
 *
 * To run a query within a React component, call `useGqlCheckVerificationTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlCheckVerificationTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlCheckVerificationTokenQuery({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGqlCheckVerificationTokenQuery(baseOptions?: Apollo.QueryHookOptions<GqlCheckVerificationTokenQuery, GqlCheckVerificationTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlCheckVerificationTokenQuery, GqlCheckVerificationTokenQueryVariables>(GqlCheckVerificationTokenDocument, options);
      }
export function useGqlCheckVerificationTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlCheckVerificationTokenQuery, GqlCheckVerificationTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlCheckVerificationTokenQuery, GqlCheckVerificationTokenQueryVariables>(GqlCheckVerificationTokenDocument, options);
        }
export type GqlCheckVerificationTokenQueryHookResult = ReturnType<typeof useGqlCheckVerificationTokenQuery>;
export type GqlCheckVerificationTokenLazyQueryHookResult = ReturnType<typeof useGqlCheckVerificationTokenLazyQuery>;
export type GqlCheckVerificationTokenQueryResult = Apollo.QueryResult<GqlCheckVerificationTokenQuery, GqlCheckVerificationTokenQueryVariables>;
export const GqlGetSessionAndUserDocument = gql`
    query GQLGetSessionAndUser($sessionToken: String) {
  sessions(where: {session_token: {_eq: $sessionToken}}) {
    id
    expires
    user {
      email
      email_verified
      id
      name
    }
  }
}
    `;

/**
 * __useGqlGetSessionAndUserQuery__
 *
 * To run a query within a React component, call `useGqlGetSessionAndUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetSessionAndUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetSessionAndUserQuery({
 *   variables: {
 *      sessionToken: // value for 'sessionToken'
 *   },
 * });
 */
export function useGqlGetSessionAndUserQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetSessionAndUserQuery, GqlGetSessionAndUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetSessionAndUserQuery, GqlGetSessionAndUserQueryVariables>(GqlGetSessionAndUserDocument, options);
      }
export function useGqlGetSessionAndUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetSessionAndUserQuery, GqlGetSessionAndUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetSessionAndUserQuery, GqlGetSessionAndUserQueryVariables>(GqlGetSessionAndUserDocument, options);
        }
export type GqlGetSessionAndUserQueryHookResult = ReturnType<typeof useGqlGetSessionAndUserQuery>;
export type GqlGetSessionAndUserLazyQueryHookResult = ReturnType<typeof useGqlGetSessionAndUserLazyQuery>;
export type GqlGetSessionAndUserQueryResult = Apollo.QueryResult<GqlGetSessionAndUserQuery, GqlGetSessionAndUserQueryVariables>;
export const GqlGetUserDocument = gql`
    query GQLGetUser($id: Int) {
  hashers(where: {id: {_eq: $id}}, limit: 1) {
    email
    email_verified
    name
  }
}
    `;

/**
 * __useGqlGetUserQuery__
 *
 * To run a query within a React component, call `useGqlGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGqlGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetUserQuery, GqlGetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetUserQuery, GqlGetUserQueryVariables>(GqlGetUserDocument, options);
      }
export function useGqlGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetUserQuery, GqlGetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetUserQuery, GqlGetUserQueryVariables>(GqlGetUserDocument, options);
        }
export type GqlGetUserQueryHookResult = ReturnType<typeof useGqlGetUserQuery>;
export type GqlGetUserLazyQueryHookResult = ReturnType<typeof useGqlGetUserLazyQuery>;
export type GqlGetUserQueryResult = Apollo.QueryResult<GqlGetUserQuery, GqlGetUserQueryVariables>;
export const GqlGetUserByAccountDocument = gql`
    query GQLGetUserByAccount($provider: String, $providerAccountId: String) {
  account_links(
    limit: 1
    where: {provider: {_eq: $provider}, provider_id: {_eq: $providerAccountId}}
  ) {
    user {
      id
      email
      email_verified
      name
    }
  }
}
    `;

/**
 * __useGqlGetUserByAccountQuery__
 *
 * To run a query within a React component, call `useGqlGetUserByAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlGetUserByAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlGetUserByAccountQuery({
 *   variables: {
 *      provider: // value for 'provider'
 *      providerAccountId: // value for 'providerAccountId'
 *   },
 * });
 */
export function useGqlGetUserByAccountQuery(baseOptions?: Apollo.QueryHookOptions<GqlGetUserByAccountQuery, GqlGetUserByAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlGetUserByAccountQuery, GqlGetUserByAccountQueryVariables>(GqlGetUserByAccountDocument, options);
      }
export function useGqlGetUserByAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlGetUserByAccountQuery, GqlGetUserByAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlGetUserByAccountQuery, GqlGetUserByAccountQueryVariables>(GqlGetUserByAccountDocument, options);
        }
export type GqlGetUserByAccountQueryHookResult = ReturnType<typeof useGqlGetUserByAccountQuery>;
export type GqlGetUserByAccountLazyQueryHookResult = ReturnType<typeof useGqlGetUserByAccountLazyQuery>;
export type GqlGetUserByAccountQueryResult = Apollo.QueryResult<GqlGetUserByAccountQuery, GqlGetUserByAccountQueryVariables>;
export const GqlUpdateSessionDocument = gql`
    query GQLUpdateSession($sessionToken: String) {
  sessions(limit: 1, where: {session_token: {_eq: $sessionToken}}) {
    id
    user_id
    expires
  }
}
    `;

/**
 * __useGqlUpdateSessionQuery__
 *
 * To run a query within a React component, call `useGqlUpdateSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlUpdateSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlUpdateSessionQuery({
 *   variables: {
 *      sessionToken: // value for 'sessionToken'
 *   },
 * });
 */
export function useGqlUpdateSessionQuery(baseOptions?: Apollo.QueryHookOptions<GqlUpdateSessionQuery, GqlUpdateSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlUpdateSessionQuery, GqlUpdateSessionQueryVariables>(GqlUpdateSessionDocument, options);
      }
export function useGqlUpdateSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlUpdateSessionQuery, GqlUpdateSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlUpdateSessionQuery, GqlUpdateSessionQueryVariables>(GqlUpdateSessionDocument, options);
        }
export type GqlUpdateSessionQueryHookResult = ReturnType<typeof useGqlUpdateSessionQuery>;
export type GqlUpdateSessionLazyQueryHookResult = ReturnType<typeof useGqlUpdateSessionLazyQuery>;
export type GqlUpdateSessionQueryResult = Apollo.QueryResult<GqlUpdateSessionQuery, GqlUpdateSessionQueryVariables>;
export const GqlKennelForTrailDocument = gql`
    query GQLKennelForTrail($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    kennel
    hares {
      hasher
    }
  }
}
    `;

/**
 * __useGqlKennelForTrailQuery__
 *
 * To run a query within a React component, call `useGqlKennelForTrailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGqlKennelForTrailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlKennelForTrailQuery({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlKennelForTrailQuery(baseOptions?: Apollo.QueryHookOptions<GqlKennelForTrailQuery, GqlKennelForTrailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlKennelForTrailQuery, GqlKennelForTrailQueryVariables>(GqlKennelForTrailDocument, options);
      }
export function useGqlKennelForTrailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlKennelForTrailQuery, GqlKennelForTrailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlKennelForTrailQuery, GqlKennelForTrailQueryVariables>(GqlKennelForTrailDocument, options);
        }
export type GqlKennelForTrailQueryHookResult = ReturnType<typeof useGqlKennelForTrailQuery>;
export type GqlKennelForTrailLazyQueryHookResult = ReturnType<typeof useGqlKennelForTrailLazyQuery>;
export type GqlKennelForTrailQueryResult = Apollo.QueryResult<GqlKennelForTrailQuery, GqlKennelForTrailQueryVariables>;
export const ScheduleTrailsDocument = gql`
    query ScheduleTrails {
  kennels(where: {frequency: {_neq: 0}, next: {_is_null: false}}) {
    frequency
    next
    trails(order_by: {start: desc}, where: {start: {_gt: "now()"}}) {
      start
      id
    }
    id
    short_name
    trails_aggregate {
      aggregate {
        max {
          start
        }
      }
    }
  }
}
    `;

/**
 * __useScheduleTrailsQuery__
 *
 * To run a query within a React component, call `useScheduleTrailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScheduleTrailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduleTrailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useScheduleTrailsQuery(baseOptions?: Apollo.QueryHookOptions<ScheduleTrailsQuery, ScheduleTrailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScheduleTrailsQuery, ScheduleTrailsQueryVariables>(ScheduleTrailsDocument, options);
      }
export function useScheduleTrailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScheduleTrailsQuery, ScheduleTrailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScheduleTrailsQuery, ScheduleTrailsQueryVariables>(ScheduleTrailsDocument, options);
        }
export type ScheduleTrailsQueryHookResult = ReturnType<typeof useScheduleTrailsQuery>;
export type ScheduleTrailsLazyQueryHookResult = ReturnType<typeof useScheduleTrailsLazyQuery>;
export type ScheduleTrailsQueryResult = Apollo.QueryResult<ScheduleTrailsQuery, ScheduleTrailsQueryVariables>;
export const SyncDocument = gql`
    query Sync {
  kennels(where: {google_calendar: {_is_null: false}}) {
    ...GQLKennelAddInfo
    trails(where: {start: {_gte: "NOW()"}, draft: {_is_null: true}}) {
      ...GQLInsertTrail
    }
  }
}
    ${GqlKennelAddInfoFragmentDoc}
${GqlInsertTrailFragmentDoc}`;

/**
 * __useSyncQuery__
 *
 * To run a query within a React component, call `useSyncQuery` and pass it any options that fit your needs.
 * When your component renders, `useSyncQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSyncQuery({
 *   variables: {
 *   },
 * });
 */
export function useSyncQuery(baseOptions?: Apollo.QueryHookOptions<SyncQuery, SyncQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SyncQuery, SyncQueryVariables>(SyncDocument, options);
      }
export function useSyncLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SyncQuery, SyncQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SyncQuery, SyncQueryVariables>(SyncDocument, options);
        }
export type SyncQueryHookResult = ReturnType<typeof useSyncQuery>;
export type SyncLazyQueryHookResult = ReturnType<typeof useSyncLazyQuery>;
export type SyncQueryResult = Apollo.QueryResult<SyncQuery, SyncQueryVariables>;
export const GqlKennelRolesEditViewDocument = gql`
    subscription GQLKennelRolesEditView($kennelId: Int) {
  kennels(limit: 1, where: {id: {_eq: $kennelId}}) {
    management {
      id
      hasherInfo {
        id
        name
      }
      permissions {
        permissionInfo {
          description
          permission
        }
      }
      title
    }
  }
}
    `;

/**
 * __useGqlKennelRolesEditViewSubscription__
 *
 * To run a query within a React component, call `useGqlKennelRolesEditViewSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGqlKennelRolesEditViewSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlKennelRolesEditViewSubscription({
 *   variables: {
 *      kennelId: // value for 'kennelId'
 *   },
 * });
 */
export function useGqlKennelRolesEditViewSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GqlKennelRolesEditViewSubscription, GqlKennelRolesEditViewSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GqlKennelRolesEditViewSubscription, GqlKennelRolesEditViewSubscriptionVariables>(GqlKennelRolesEditViewDocument, options);
      }
export type GqlKennelRolesEditViewSubscriptionHookResult = ReturnType<typeof useGqlKennelRolesEditViewSubscription>;
export type GqlKennelRolesEditViewSubscriptionResult = Apollo.SubscriptionResult<GqlKennelRolesEditViewSubscription>;
export const GqlAttendanceViewDocument = gql`
    subscription GQLAttendanceView($trailId: Int) {
  attendance(where: {trail: {_eq: $trailId}}) {
    hasherInfo {
      name
      id
    }
    attended
    note
    paid
  }
}
    `;

/**
 * __useGqlAttendanceViewSubscription__
 *
 * To run a query within a React component, call `useGqlAttendanceViewSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGqlAttendanceViewSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGqlAttendanceViewSubscription({
 *   variables: {
 *      trailId: // value for 'trailId'
 *   },
 * });
 */
export function useGqlAttendanceViewSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GqlAttendanceViewSubscription, GqlAttendanceViewSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GqlAttendanceViewSubscription, GqlAttendanceViewSubscriptionVariables>(GqlAttendanceViewDocument, options);
      }
export type GqlAttendanceViewSubscriptionHookResult = ReturnType<typeof useGqlAttendanceViewSubscription>;
export type GqlAttendanceViewSubscriptionResult = Apollo.SubscriptionResult<GqlAttendanceViewSubscription>;