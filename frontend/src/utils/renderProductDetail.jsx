// src/utils/renderProductDetail.js
import React from "react";

// Importing detail pages for accessories (IDs 1-16)
// import AssortmentOneDetailPage from "../pages/Accessories-DetailPages/AssortmentOneDetailPage";
// import BarTapeDetailPage from "../pages/Accessories-DetailPages/BarTapeDetailPage";
// import BullhornBarsDetailPage from "../pages/Accessories-DetailPages/BullhornBarsDetailPage";
// import NylonPlatformPedalsDetailPage from "../pages/Accessories-DetailPages/NylonPlatformPedalsDetailPage";
// import PartsAndAccessoriesDetailPage from "../pages/Accessories-DetailPages/PartsAndAccessoriesDetailPage";
// import PrestaValveAdapterDetailPage from "../pages/Accessories-DetailPages/PrestaValveAdapterDetailPage";
// import ProFootstrapDetailPage from "../pages/Accessories-DetailPages/ProFootstrapDetailPage";
// import PureFixDropBarsDetailPage from "../pages/Accessories-DetailPages/PureFixDropBarsDetailPage";
// import PureFixRiserBarsDetailPage from "../pages/Accessories-DetailPages/PureFixRiserBarsDetailPage";
// import SecurityLocksDetailPage from "../pages/Accessories-DetailPages/SecurityLocksDetailPage";
// import SnackBagsDetailPage from "../pages/Accessories-DetailPages/SnackBagsDetailPage";
// import SportcycleBellsDetailPage from "../pages/Accessories-DetailPages/SportcycleBellsDetailPage";
// import ThickslickPureDetailPage from "../pages/Accessories-DetailPages/ThickslickPureDetailPage";
// import ThreadlessStemDetailPage from "../pages/Accessories-DetailPages/ThreadlessStemDetailPage";
// import WaterBottleCageDetailPage from "../pages/Accessories-DetailPages/WaterBottleCageDetailPage";
// import WoodenCityCrateDetailPage from "../pages/Accessories-DetailPages/WoodenCityCrateDetailPage";

// // Importing detail pages for bikes (IDs 17-31)
// import AdventureAlDetailPage from "../pages/Bikes-DetailPages/AdventureAlDetailPage";
// import CityClassic3SpeedDetailPage from "../pages/Bikes-DetailPages/CityClassic3SpeedDetailPage";
// import CityClassic8SpeedDetailPage from "../pages/Bikes-DetailPages/CityClassic8SpeedDetailPage";
// import CityStepThrough8SpeedDetailPage from "../pages/Bikes-DetailPages/CityStepThrough8SpeedDetailPage";
// import CityStepThrough26_3SpeedDetailPage from "../pages/Bikes-DetailPages/CityStepThrough26_3SpeedDetailPage";
// import CityStepThrough26_8SpeedDetailPage from "../pages/Bikes-DetailPages/CityStepThrough26_8SpeedDetailPage";
// import CityStepThroughDetailPage from "../pages/Bikes-DetailPages/CityStepThroughDetailPage";
// import CoasterDetailPage from "../pages/Bikes-DetailPages/CoasterDetailPage";
// import OriginalBikeDetailPage from "../pages/Bikes-DetailPages/OriginalBikeDetailPage";
// import PureCyclesOriginalDetailPage from "../pages/Bikes-DetailPages/PureCyclesOriginalDetailPage";
// import PureFixMicroOriginalSeriesDetailPage from "../pages/Bikes-DetailPages/PureFixMicroOriginalSeriesDetailPage";
// import PureFixOriginalDetailPage from "../pages/Bikes-DetailPages/PureFixOriginalDetailPage";
// import UrbanCommuterBikeDetailPage from "../pages/Bikes-DetailPages/UrbanCommuterBikeDetailPage";
// import UrbanCommuterDetailPage from "../pages/Bikes-DetailPages/UrbanCommuterDetailPage";

export const RenderProductDetail = (id) => {
  switch (parseInt(id, 10)) {
    case 1:
      return <AssortmentOneDetailPage />;
    case 2:
      return <BarTapeDetailPage />;
    case 3:
      return <BullhornBarsDetailPage />;
    case 4:
      return <NylonPlatformPedalsDetailPage />;
    case 5:
      return <PartsAndAccessoriesDetailPage />;
    case 6:
      return <PrestaValveAdapterDetailPage />;
    case 7:
      return <ProFootstrapDetailPage />;
    case 8:
      return <PureFixDropBarsDetailPage />;
    case 9:
      return <PureFixRiserBarsDetailPage />;
    case 10:
      return <SecurityLocksDetailPage />;
    case 11:
      return <SnackBagsDetailPage />;
    case 12:
      return <SportcycleBellsDetailPage />;
    case 13:
      return <ThickslickPureDetailPage />;
    case 14:
      return <ThreadlessStemDetailPage />;
    case 15:
      return <WaterBottleCageDetailPage />;
    case 16:
      return <WoodenCityCrateDetailPage />;
    case 17:
      return <AdventureAlDetailPage />;
    case 18:
      return <CityClassic3SpeedDetailPage />;
    case 19:
      return <CityClassic8SpeedDetailPage />;
    case 20:
      return <CityStepThroughDetailPage />;
    case 21:
      return <CityStepThrough3SpeedDetailPage />;
    case 22:
      return <CityStepThrough8SpeedDetailPage />;
    case 23:
      return <CityStepThrough26_3SpeedDetailPage />;
    case 24:
      return <CityStepThrough26_8SpeedDetailPage />;
    case 25:
      return <CoasterDetailPage />;
    case 26:
      return <OriginalBikeDetailPage />;
    case 27:
      return <PureCyclesOriginalDetailPage />;
    case 28:
      return <PureFixMicroOriginalSeriesDetailPage />;
    case 29:
      return <PureFixOriginalDetailPage />;
    case 30:
      return <UrbanCommuterDetailPage />;
    case 31:
      return <UrbanCommuterBikeDetailPage />;
    default:
      return <div>Product Not Found</div>;
  }
};
