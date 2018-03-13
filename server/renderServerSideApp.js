import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import indexHtml from './indexHtml';
import App from '../src/App';
import configureStore from '../src/utils/configureStore';
import fetchDataForRender from './fetchDataForRender';

const renderServerSideApp = (req, res) => {
  const store = configureStore(undefined, { logger: false });

  fetchDataForRender(req, store).then(() => {
    const context = {};
    const sheet = new ServerStyleSheet();
    const markup = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    );
    const styleTags = sheet.getStyleTags();
    console.log('---===== STYLES START =====---');
    console.log(styleTags.length);
    console.log(styleTags);
    console.log('---===== STYLES STOP =====---');

    if (context.url) {
      res.redirect(context.url);
    } else {
      const helmet = Helmet.renderStatic();
      const fullMarkup = indexHtml({
        initialState: store.getState(),
        helmet,
        markup
      });

      res.status(200).send(fullMarkup);
    }
  });
};

export default renderServerSideApp;
