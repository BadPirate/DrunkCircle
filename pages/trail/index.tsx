/* eslint-disable camelcase */
import {
  Button, Container, Dropdown,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import RootNav from '../../src/components/RootNav'
import ErrorBanner from '../../src/components/ErrorBanner'
import PublicClientHasura from '../../src/graph/PublicClientHasura'
import ListTable from '../../src/components/ListTable'
import { LoadSpinner } from '../../src/components/LoadSpinner'
import { trailDateFormat } from '../../src/func/dateFormats'
import { ilogError } from '../../src/func/Logging'
import {
  GqlKennelInfoFragment, GqlPageTrailFragment, GqlTrailIndexPreloadDocument,
  GqlTrailIndexPreloadQuery, useGqlPageTrailsQuery,
} from '../../src/graph/types'

const Trail = ({ kennels: allKennels } : {kennels : GqlKennelInfoFragment[]}) => {
  const [limit, setLimit] = useState(10)
  const [showHareless, setShowHareless] = useState<boolean>(true)
  const [after] = useState(() => {
    const date = new Date()
    date.setHours(date.getHours() - 8)
    return date
  })
  const [filters, setFilters] = useState<number[]>([])
  useEffect(() => {
    const stored = localStorage.getItem('kennelFilters')
    if (stored) setFilters(stored.split(',').map((i) => parseInt(i, 10)))
    if (localStorage.getItem('hideHareless')) {
      setShowHareless(false)
    }
  }, [])
  const toggleFilter = (kennelId : number) => {
    const updatedFilters = filters.filter((i) => i !== kennelId)
    if (updatedFilters.length === filters.length) {
      updatedFilters.push(kennelId)
    }
    setFilters(updatedFilters)
    localStorage.setItem('kennelFilters', updatedFilters.join(','))
  }
  const { loading, error, data } = useGqlPageTrailsQuery(
    { client: PublicClientHasura, variables: { limit, after, filters } },
  )
  const kennels : { [key: string] : {
    toggled: boolean,
    id: number
  } } = {}
  let showTrails : GqlPageTrailFragment[] = []
  if (data) {
    showTrails = data.trails
    if (!showHareless) {
      showTrails = showTrails.filter((t) => t.hares.length > 0)
    }
    showTrails.forEach((t) => {
      if (!t.kennelInfo.short_name) return
      kennels[t.kennelInfo.short_name] = {
        toggled: filters.find((i) => i === t.kennelInfo.id) === undefined,
        id: t.kennelInfo.id,
      }
    })
  }
  filters.forEach((f) => {
    const k = allKennels.find((ks) => ks.id === f)
    if (!k || !k.short_name) return
    kennels[k.short_name] = {
      toggled: false,
      id: f,
    }
  })
  return (
    <RootNav
      title="DrunkCircle Upcoming Trails"
      description="List of all the up and coming trails hashable through DrunkCircle"
    >
      <Container>
        <h1>Upcoming Trails</h1>
        <ListTable
          columns={[{
            key: 'Kennel',
            row: (
              <Dropdown>
                <Dropdown.Toggle id="kennel-dropdown">
                  Kennel
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    Object.keys(kennels)
                      .map((shortName) => (
                        <Dropdown.Item
                          key={`${kennels[shortName].id}+${kennels[shortName].toggled ? 'toggled' : 'untoggled'}`}
                          onClick={() => toggleFilter(kennels[shortName].id)}
                        >
                          <input
                            type="checkbox"
                            readOnly
                            checked={kennels[shortName].toggled}
                            className="form-check-input me-1"
                          />
                          {shortName}
                        </Dropdown.Item>
                      ))
                  }
                </Dropdown.Menu>
              </Dropdown>
            ),
          }, {
            key: 'Trail',
            row: (
              <Dropdown>
                <Dropdown.Toggle id="trail-dropdown">
                  Trail
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key="needs-hare"
                    onClick={() => {
                      if (showHareless) {
                        localStorage.setItem('hideHareless', 'hide')
                      } else {
                        localStorage.removeItem('hideHareless')
                      }
                      setShowHareless(!showHareless)
                    }}
                  >
                    <input type="checkbox" readOnly checked={showHareless} className="form-check-input me-1" />
                    Show trails with no hare
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ),
          }]}
          rows={
            showTrails.map((t) => [
              {
                row: t.kennelInfo.short_name,
                link: `/kennel/${t.kennelInfo.id}`,
              },
              {
                row: (
                  <div>
                    <h5>{t.name}</h5>
                    <p>{trailDateFormat(t.start)}</p>
                    <p>
                      {t.hares.length > 0 ? `Hares: ${t.hares.map((h) => h.hasherInfo.name).join(', ')}`
                        : 'You could hare this trail!'}
                    </p>
                  </div>
                ),
                wrap: true,
                link: `/trail/${t.id}`,
              },
            ])
          }
        />
        { data && limit === data.trails.length
          ? <Button onClick={() => { setLimit(limit + 20) }}>More</Button> : null }
        { error ? <ErrorBanner error={error} /> : null }
        { loading ? <LoadSpinner /> : null }
      </Container>
    </RootNav>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const kennels = await PublicClientHasura.query<GqlTrailIndexPreloadQuery>({
    query: GqlTrailIndexPreloadDocument,
  }).then((r) => {
    if (!r.data) {
      ilogError('Error preloading kennels', r)
      return []
    }
    return r.data.kennels
  })
  return {
    props: { kennels },
  }
}

export default Trail
