interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pendiente: Tempor cillum dolore ullamco magna aute ullamco commodo ea sunt officia sunt amet consequat.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'En Progreso: Fugiat dolore reprehenderit duis adipisicing veniam enim adipisicing officia veniam amet.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Terminado: Voluptate nulla ad duis ipsum id sunt sint tempor.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
}
