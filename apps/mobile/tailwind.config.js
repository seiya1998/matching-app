/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    data: {
      error: 'error=true'
    },
    extend: {
      fontSize: {
        s: ['12px', { lineHeight: '18px', letterSpacing: 0.6 }],
        m: ['14px', { lineHeight: '24px', letterSpacing: 0.7 }],
        l: ['16px', { lineHeight: '24px', letterSpacing: 0.8 }],
        xl: ['18px', { lineHeight: '28.8px', letterSpacing: 0.9 }],
        xxl: ['20px', { lineHeight: '32px', letterSpacing: 1 }],
        xxxl: ['24px', { lineHeight: '38.4px', letterSpacing: 1.2 }]
      },
      textColor: {
        body: '#25231F',
        description: '#66645f',
        disable: '#c3c0ba',
        alert: '#eb5052'
      },
      borderColor: {
        divider: '#e6e3dd', //gray-3
        disable: '#a4a19c', //gray-5
        focused: '#6f8d1b', //green-5
        alert: '#f03f39' // red-5
      },
      borderRadius: {
        normal: '12px',
        circle: '9999px'
      },
      colors: {
        primary: '#4a90e2',
        gray: {
          0: '#fdfaf4',
          1: '#f9f6f0',
          2: '#f3f0ea',
          3: '#e6e3dd',
          4: '#c3c0ba',
          5: '#a4a19c',
          6: '#7b7873',
          7: '#66645f',
          8: '#474540',
          9: '#25231f'
        },
        blue: {
          0: '#e4f2fa',
          1: '#beddf3',
          2: '#97c9eb',
          3: '#72b3e2',
          4: '#59a3dd',
          5: '#4495d8',
          6: '#3c87cb',
          7: '#3376b9',
          8: '#2c65a7',
          9: '#204987'
        },
        green: {
          0: '#f1f4e8',
          1: '#d2dcb8',
          2: '#bdcb96',
          3: '#9fb366',
          4: '#8ca449',
          5: '#6f8d1b',
          6: '#658019',
          7: '#4f6413',
          8: '#3d4e0f',
          9: '#2f3b0b'
        },
        orange: {
          0: '#fef5e3',
          1: '#fee5ba',
          2: '#ffd58b',
          3: '#ffc35a',
          4: '#ffb637',
          5: '#ffa91e',
          6: '#ff9d1a',
          7: '#fa8d16',
          8: '#f57d12',
          9: '#ee6414'
        },
        red: {
          0: '#feebee',
          1: '#fdccd2',
          2: '#ec999b',
          3: '#e17174',
          4: '#eb5052',
          5: '#f03f39',
          6: '#e13538',
          7: '#cf2c32',
          8: '#c2252b',
          9: '#b3181f'
        }
      }
    },
    plugins: []
  }
};
