/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PublicClientHasura from '../graph/PublicClientHasura'
import { useGqlUserPermsLazyQuery } from '../graph/types'

export function useUserPermissions(kennelId: number) {
  const session = useSession()
  const [loadPerms, { data }] = useGqlUserPermsLazyQuery({ client: PublicClientHasura })
  const hasherId = session && session.data && session.data.user
    ? parseInt(session.data.user.id, 10) : null
  useEffect(() => {
    if (!hasherId) { return }
    loadPerms({ variables: { hasherId, kennelId } })
  }, [hasherId, loadPerms, kennelId])
  const perms = data ? data.management.flatMap((m) => m.permissions).map((mp) => mp.permission) : []
  return perms
}
