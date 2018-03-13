import ReactDOMServer from 'react-dom/server';
import App from './App';
import * as React from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import { StaticRouter, Route, Switch } from 'react-router-dom';
import Colours from './components/Colours';

const store = configureStore();

it('renders a stylesheet with same number of elements on third request as in first', () => {
    const context1 = {};

    const sheet1 = new ServerStyleSheet();
    const markup1 = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet1.instance}>
        <Provider store={store}>
          <StaticRouter location="/colours/123456" context={context1}>
            <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    );
    const elements1 = sheet1.getStyleTags();

    const context2 = {};
    const sheet2 = new ServerStyleSheet();
    const markup2 = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet2.instance}>
        <Provider store={store}>
          <StaticRouter location="/colours/654321" context={context2}>
            <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    );
    const elements2 = sheet2.getStyleTags();

    const context3 = {};
    const sheet3 = new ServerStyleSheet();
    const markup3 = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet3.instance}>
        <Provider store={store}>
          <StaticRouter location="/colours/123456" context={context3}>
            <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    );
    const elements3 = sheet3.getStyleTags();

    expect(elements3.length).toEqual(elements1.length);
});