import { useTranslation } from "react-i18next";
import {
  PageSeo,
  HeroBanner,
  FocusArea,
  GlobalChampion,
  NationalImpact,
  IndustrySize,
  OurHighlight,
  ProgrammesInitiatives,
  OurPublications,
  GetInTouch,
  FrequentlyAskedQuestions,
} from "../../src/components/digital-content";

const DigitalCreativeContent = () => {
  const { t } = useTranslation("digitalcontent");

  return (
    <>
      <PageSeo t={t} />
      <HeroBanner t={t} />
      <FocusArea t={t} />
      <GlobalChampion t={t} />
      <NationalImpact t={t} />
      <IndustrySize />
      <OurHighlight />
      <ProgrammesInitiatives />
      <OurPublications />
      <GetInTouch t={t} />
      {/* <FrequentlyAskedQuestions t={t} /> */}
    </>
  );
};

export default DigitalCreativeContent;
