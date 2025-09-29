import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import PageCard from '../src/components/PageCard'

interface LicenseProps {
  content: string,
}

const LicensePage = ({ content }: LicenseProps) => (
  <PageCard title="DrunkCircle License" description="Down Down License">
    <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
  </PageCard>
)

export const getStaticProps: GetStaticProps<LicenseProps> = async () => {
  const licensePath = path.join(process.cwd(), 'LICENSE.md')
  const content = fs.readFileSync(licensePath, 'utf8')

  return {
    props: {
      content,
    },
  }
}

export default LicensePage
