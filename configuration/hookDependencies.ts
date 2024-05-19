import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

export type HookDependencies = Readonly<{
  usePathname: () => string
  useRouter: () => AppRouterInstance
  useSearchParams: () => ReadonlyURLSearchParams
}>

export const hookDependencies: HookDependencies = {
  usePathname,
  useRouter,
  useSearchParams,
}
