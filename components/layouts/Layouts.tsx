import { Box } from '@mui/material'
import Head from 'next/head'
import { FC } from 'react'
import { Navbar, Sidebar } from '../ui'

interface Props {
  title?: string
}

export const Layout: FC<Props> = ({ title = 'OpenJira App', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ padding: '1em 1.25em' }}>{children}</Box>
    </Box>
  )
}
