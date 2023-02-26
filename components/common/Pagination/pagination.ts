import { ParsedUrlQuery } from 'querystring'

export function pagination(nombreDeResultat: number, nombreDeLieuxAffichesParPage: number, query: ParsedUrlQuery) {
  const nombreDePage = Math.trunc(nombreDeResultat / nombreDeLieuxAffichesParPage + (nombreDeResultat % nombreDeLieuxAffichesParPage > 0 ? 1 : 0))
  const pageCourante = query.page === undefined ? 0 : Number(query.page)

  const pages = new Array(nombreDePage)
    .fill('')
    .map((_, index): number => index + 1)
    .filter((page): boolean => {
      const debutDePagination = pageCourante < 3
      const finDePagination = pageCourante > nombreDePage - 3

      if (debutDePagination) {
        return page === 1
          || page === 2
          || page === 3
          || page === 4
          || page === 5
      } else if (finDePagination) {
        return page === nombreDePage - 4
          || page === nombreDePage - 3
          || page === nombreDePage - 2
          || page === nombreDePage - 1
          || page === nombreDePage
      } else {
        return pageCourante === page - 1
          || pageCourante - 1 === page - 1
          || pageCourante - 2 === page - 1
          || pageCourante + 1 === page - 1
          || pageCourante + 2 === page - 1
      }
    })

  return {
    nombreDePage,
    pageCourante,
    pages,
  }
}
