import RouteSystem from "./routers/RouteSystem";
import Header from "./components/Header/Header";
// @ts-expect-error following library doesnt have types
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useShop } from "./hooks/shop-state";

function App() {
  // let height = window?.innerHeight;
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  document.body.className = "rtl:font-yekanBakh ltr:font-nunito";

  const { shopData } = useShop();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{shopData?.site_title}</title>
        <link rel="icon" href={shopData?.fav_icon} />
        <meta name="description" content={shopData?.site_short_about} />
      </Helmet>
      <div className={`h-screen w-full flex flex-col p-2 gap-2 text-base`}>
        <Header />
        <div className="flex-1 w-full h-1/2">
          <RouteSystem />
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default App;
