import ReactDOMServer from 'react-dom/server';
import App from './App';
import { ServerStyleSheet } from 'styled-components';

it('renders a stylesheet with same number of elements on second request as in first', () => {
    const context1 = {};

    const sheet1 = new ServerStyleSheet();
    const markup1 = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet1.instance}>
        <Provider store={store}>
          <StaticRouter location="/colour/123456" context={context1}>
            <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    );
    const elements1 = sheet1.getStyleElement();

    const context2 = {};
    const sheet2 = new ServerStyleSheet();
    const markup2 = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet2.instance}>
        <Provider store={store}>
          <StaticRouter location="/colour/654321" context={context2}>
              <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>
    );
    const elements2 = sheet2.getStyleElement();
});