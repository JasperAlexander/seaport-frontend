import { NextRouter } from 'next/router'

/**
 * Adds query to URL
 * @param router Next.js router
 * @param item query label
 * @param value query value
 */
function toggleOnItem(router: NextRouter, item: string, value: string) {
  router.push(
    {
      query: { ...router.query, [`${item}`]: value },
    },
    undefined,
    {
      shallow: true,
    }
  )
}

/**
 * Removes query of URL
 * @param router Next.js router
 * @param item query label
 */
function toggleOffItem(router: NextRouter, item: string) {
  let query = router.query

  delete query[`${item}`]

  router.push(
    {
      query,
    },
    undefined,
    {
      shallow: true,
    }
  )
}

/**
 * Removes all queries of URL
 * @param router Next.js router
 */
function toggleOffItems(router: NextRouter) {
  let query = {}

  router.push(
    {
      query,
    },
    undefined,
    {
      shallow: true,
    }
  )
}

function toggleOnAttributeKey(router: NextRouter, item: string, value: string) {
  let query = router.query

  // Delete all attribute filters
  Object.keys(query).find((key) => {
    if (
      key.startsWith('attributes[') &&
      key.endsWith(']') &&
      query[key] !== ''
    ) {
      delete query[key]
    }
  })

  router.push(
    {
      query: { ...router.query, [`${item}`]: value },
    },
    undefined,
    {
      shallow: true,
    }
  )
}

function updateItem(router: NextRouter, item: string, value: string) {
  router.push(
    {
      query: { ...router.query, [`${item}`]: value },
    },
    undefined,
    {
      shallow: true,
    }
  )
}

export { toggleOffItem, toggleOffItems, toggleOnItem, updateItem, toggleOnAttributeKey }