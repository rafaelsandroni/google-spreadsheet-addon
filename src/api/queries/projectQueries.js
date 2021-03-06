ApiClient_.prototype.fetchAllProjects = function () {
  const query = {
    'query': `{
       allProjects {
         slug
         name
         ticker
         marketcapUsd
         priceUsd
         volumeUsd
         ethBalance
         usdBalance
         ethSpent30d: ethSpent(days:30)
         ethSpent7d: ethSpent(days:7)
         ethSpent1d: ethSpent(days:1)
       }
     }`
  }

  return this.conn.graphQLQuery(query, 'allProjects')
}

ApiClient_.prototype.fetchErc20Projects = function () {
  const query = {
    'query': `{
       allErc20Projects {
         slug
         name
         ticker
         mainContractAddress
         marketcapUsd
         priceUsd
         volumeUsd
         ethBalance
         usdBalance
         ethSpent30d: ethSpent(days:30)
         ethSpent7d: ethSpent(days:7)
         ethSpent1d: ethSpent(days:1)
       }
     }`
  }

  return this.conn.graphQLQuery(query, 'allErc20Projects')
}

ApiClient_.prototype.fetchProjectFundamentals = function (slug) {
  const query = {
    'query': `{
       projectBySlug(${slugParam(slug)}) {
         ticker
         name
         slug
         fundsRaisedUsdIcoEndPrice
         ethSpent30d: ethSpent(days:30)
         ethBalance
         usdBalance
         priceUsd
         percentChange24h
         percentChange7d
         volumeChange24h
         availableSupply
         marketcapUsd
         averageDevActivity(days:30)
         volumeUsd
       }
     }`
  }

  return this.conn.graphQLQuery(query, 'projectBySlug')
}

ApiClient_.prototype.fetchProjectSocialData = function (slug) {
  const query = {
    'query': `{
      projectBySlug(${slugParam(slug)}) {
        ticker
        name
        slug
        websiteLink
        facebookLink
        blogLink
        linkedinLink
        githubLink
        twitterLink
        whitepaperLink
        redditLink
        slackLink
      }
    }`
  }

  return this.conn.graphQLQuery(query, 'projectBySlug')
}
