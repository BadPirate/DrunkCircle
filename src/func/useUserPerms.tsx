/* eslint-disable import/prefer-default-export */
import { gql, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { GQLUserPerms } from '../graph/types'
import PublicClientHasura from '../graph/PublicClientHasura'

const GQL_USER_PERMS = gql`
query GQLUserPerms($hasherId: Int, $kennelId: Int) {
  management(where: {hasher: {_eq: $hasherId}, kennel: {_eq: $kennelId}}) {
    permissions {
      permission
    }
  }
}
`
export function useUserPermissions(kennelId: number) {
  const session = useSession()
  const [loadPerms, { data }] = useLazyQuery<GQLUserPerms>(
    GQL_USER_PERMS,
    { client: PublicClientHasura },
  )
  const hasherId = session && session.data && session.data.user ? session.data.user.id : null
  useEffect(() => {
    if (!hasherId) { return }
    loadPerms({ variables: { hasherId, kennelId } })
  }, [hasherId, loadPerms, kennelId])
  const perms = data ? data.management.flatMap((m) => m.permissions).map((mp) => mp.permission) : []
  return perms
}
