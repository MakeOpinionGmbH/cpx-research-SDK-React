# CPX Research SDK React

**Monetize your product with fun surveys.**

We will make it easy for you: Simply implement our solution and be ready to start monetizing your product immediately!
Let users earn your virtual currency by simply participating in exciting and well paid online surveys!

This SDK is owned by [MakeOpinion GmbH](http://www.makeopinion.com).

[Learn more.](https://www.cpx-research.com/main/en/)

# Table of Contents

- [Preview](#preview)
- [Installation](#installation)
- [Usage](#usage)
- [For Developers](#for-developers)

# Preview
![Preview](https://raw.githubusercontent.com/MakeOpinionGmbH/cpx-research-SDK-React/main/preview.png "Preview")

# Installation

1. Install the SDK like any other npm package, using yarn or npm
``` 
yarn add cpx-research-sdk-react

# or

npm install cpx-research-sdk-react
```

2. Now import the package in your JavaScript files and use it like any other React Component.
```javascript
import CpxResearch from "cpx-research-sdk-react";
```

# Usage

## Getting Started (Easy)

### Basic Configuration
Customize every CPX Widget as it fits your needs.
Below are all required/basic configuration options for the CPX Widget. There are a few additional ones, but more on that later.

Note: If you don't pass a configuration for any of the corner, sidebar or notification widgets, these specific widgets will then not be displayed.
```jsx
<CpxResearch
  accentColor="#ff9800"  // the accent color for the browser/iframe icons and progress bar
  appId="1"
  userId="2"
  isHidden={isCpxLayerHidden}// in case you want to hide the widget completely, simplye pass a boolean (for example a state variable).
  cornerWidget={{
    backgroundColor: "#ff9800",
    position: "topright",
    roundedCorners: 0,
    size: 150,
    text: "Click me",
    textColor: "#ffffff",
    textSize: 16,
  }}
  notificationWidget={{
    backgroundColor: "#ff9800",
    height: 60,
    isSingleSurvey: true,
    position: "bottom",
    roundedCorners: 10,
    text: "Click me",
    textColor: "#ffffff",
    textSize: 18,
    width: 320,
  }}
  sidebarWidget={{
    backgroundColor: "#ff9800",
    height: 320,
    position: "left",
    roundedCorners: 50,
    text: "Click me",
    textColor: "#ffffff",
    textSize: 18,
    width: 60,
  }}
/>
```

### Only Specific Views
To display the CPXResearch Widget only in specific divs, simply add it inside those divs (for example in a specific page/route in your app).
The CPX Widget will take the available space.

### Entire App Overlay
For an entire app overlay add the CPX Widget next to your root component, using a fragment, like in the example below:
```jsx
const App = () => (
  <>
    <CpxResearch
      appId="1"
      userId="2"
      accentColor="#ff9800"
      cornerWidget={{ /* ... */ }}
      notificationWidget={{ /* ... */ }}
      sidebarWidget={{ /* ... */ }}
    />
    <div>
      This is the root component of your application
    </div>
  </>
);
```

## Getting Started (Expert)
As stated above, it is possible to not pass any configuration for the corner, sidebar or notification widgets, which then means none of them will be displayed.
This might be especially useful if you want to build your own widgets/components. 
For this use-case, the SDK provides multiple callbacks/methods where you can get the required data:

Now handle the CPXResearch Response with the listeners below and use your own Widgets to display the surveys.
```jsx
const App = () =>
{
  /**
   * Create refs for the methods the SDK provides and bind them like shown below.
   * Then you can call them like any other function (have a look at the TouchableOpacity Buttons below)
   */
  const markTransactionAsPaidRef = useRef();
  const fetchSurveysAndTransactionsRef = useRef();
  const openWebViewRef = useRef();
  
  /**
   * Add the change callbacks for the surveys and transactions updates
   */
  const onSurveysUpdate = surveys =>
  {
    console.log("onSurveysUpdate Callback", surveys);
  };

  const onTransactionsUpdate = transactions =>
  {
    console.log("onSurveysUpdate Callback", transactions);
  };

  const onWebViewWasClosed = () =>
  {
    console.log("onWebViewWasClosed Callback");
  };

  return (
    <>
      <CpxResearch
        /* ... */
        // add the callback methods:
        onSurveysUpdate={onSurveysUpdate}  // will be called when the surveys updated
        onTransactionsUpdate={onTransactionsUpdate}  // will be called when the transactions updated
        onWebViewWasClosed={onWebViewWasClosed}  // will be called when the user closed the webView
        // bind the refs:
        bindMarkTransactionAsPaid={markTransactionAsPaid => markTransactionAsPaidRef.current = markTransactionAsPaid}
        bindFetchSurveysAndTransactions={fetchSurveysAndTransactions => fetchSurveysAndTransactionsRef.current = fetchSurveysAndTransactions}
        bindOpenWebView={openWebView => openWebViewRef.current = openWebView}
        /* ... */
      />
      <div style={styles.appWrapper}>
        <div style={styles.container}>
          { /* use the refs */ }
          <button style={styles.button} onClick={() => fetchSurveysAndTransactionsRef.current?.()}>
            Fetch surveys and transactions
          </button>
          <button style={styles.button} onClick={() => markTransactionAsPaidRef.current?.("123", "345")}>
            Mark Transaction as paid
          </button>
          <button style={styles.button} onClick={() => openWebViewRef.current?.(/* pass optional surveyId here */)}>
            Open Webview
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
```

**Note**: For a typescript example have a look at the demo app in the ./src sub folder on GitHub.

## Using the SurveyCards Widget
The CPXSurveyCards Widget can be configured as follows:
```jsx
import { CpxSurveyCards } from "cpx-research-sdk-react";

<CpxSurveyCards
    surveys={surveys}
    texts={texts}
    config={{
      accentColor: "#41d7e5",
      cardBackgroundColor: "white",
      inactiveStarColor: "#dfdfdfff",
      starColor: "#ffc400",
      textColor: "black"
    }}
    openWebView={openWebViewRef.current}
/>
```
For the surveys, texts and the openWebView function props we need to use the features described in the 
[Getting Started (Expert)](#getting-started-(expert)) section. 

1) Assign the openWebView with the bindOpenWebView callback function provided by 
the main CPXResearch component as show in the [Getting Started (Expert)](#getting-started-(expert)) section and simply pass the openWebViewRef.current 
as a prop to the CpxSurveyCards.
2) For the surveys and texts, use a local state (or any state management pattern of your choice) to store them in your application state.
Then simply use to onSurveysUpdate and onTextsUpdate callback functions to get the texts and survey and store them in your application state.
Now you can pass them to the CpxSurveyCards as well.

Below you can see an example implementation (note that only the relevant lines of code for the CpxSurveyCards are shown):

```jsx
const App = () =>
{
  const openWebViewRef = useRef();

  const [surveys, setSurveys] = useState([]);
  const [texts, setTexts] = useState();

  return (
    <>
      <CpxResearch
        /* ... */
        onSurveysUpdate={surveys => setSurveys(surveys)}
        onTextsUpdate={texts => setTexts(texts)}
        bindOpenWebView={openWebView => openWebViewRef.current = openWebView}
        /* ... */
      />
      <View>
        /* ... */
        <CpxSurveyCards
          surveys={surveys}
          texts={texts}
          config={/* configure as shown above */}
          openWebView={openWebViewRef.current}
        />
        /* ... */
      </View>
    </>
  );
};
```
