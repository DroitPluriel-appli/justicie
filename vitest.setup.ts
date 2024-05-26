import 'vitest-dom/extend-expect'

vi.mock('next/navigation', () => {
  return {
    notFound: () => {
      throw new Error('NEXT_NOT_FOUND')
    },
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  }
})
