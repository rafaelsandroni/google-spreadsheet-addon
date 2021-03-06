const { testFieldTypes } = require('../support/helper.js')

const {
  testHandlesNullData,
  assertNumberOfRecords
} = require('../support/integrationHelper.js')

const {
  slug,
  fiatCurrency,
  from,
  to,
  days,
  numberOfDays,
  formatDate
} = require('../support/setup.js')

describe('SAN_PRICE_VOLUME_DIFF', () => {
  const expected = {
    date: 'string',
    priceChange: 'number',
    priceVolumeDiff: 'number',
    volumeChange: 'number'
  }

  const response = san.SAN_PRICE_VOLUME_DIFF(fiatCurrency, slug, from, to)
  const headers = response[0]
  const volumes = response[1]

  testFieldTypes(volumes, expected)

  testHandlesNullData(
    'fetchPriceVolumeDiff',
    san.SAN_PRICE_VOLUME_DIFF,
    fiatCurrency,
    slug,
    from,
    to)

  it('has proper headers', () => {
    const expectedHeaders = [
      'Date',
      'Price Change',
      'Price Volume Diff',
      'Volume Change'
    ]

    expect(headers).to.deep.equal(expectedHeaders)
  })

  it('returns a record per every day', () => {
    const volumes = san.SAN_PRICE_VOLUME_DIFF(fiatCurrency, slug, from, to)

    assertNumberOfRecords(volumes, numberOfDays)

    for (let [index, day] of days.entries()) {
      expect(volumes[index + 1][0]).to.equal(formatDate(day))
    }
  })
})
