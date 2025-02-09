import { ToWords } from 'to-words';

export  const ConvertToWords = new ToWords({
	localeCode: 'en-IN',
	converterOptions: {
	  currency: true,
	  ignoreDecimal: false,
	  ignoreZeroCurrency: false,
	  doNotAddOnly: false,
	  currencyOptions: {
		// can be used to override defaults for the selected locale
		name: 'Rupee',
		plural: 'Rupees',
		symbol: '₹',
		fractionalUnit: {
		  name: 'Paisa',
		  plural: 'Paise',
		  symbol: '',
		},
	  },
	},
  });