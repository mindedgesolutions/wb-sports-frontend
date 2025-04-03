import {
  WbPageWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbContentWrapper,
} from '@/components';

const WbAboutDept = () => {
  document.title = `About the Department | ${
    import.meta.env.VITE_SERVICE_APP_NAME
  }`;

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="About Us" />
        <WbContentWrapper title="About the Department">
          <div className="flex flex-col gap-8 text-sm md:text-base tracking-wider leading-relaxed text-justify">
            <p>
              The major area of activities of Department of Youth Services &
              Sports are essentially focussed at the Student - Youth section of
              the society. It is the Student-Youth, who represent the most
              vibrant, capable section of the society, who are especially
              enthusiastic in moving forward for the sake of human welfare even
              sacrificing their personal interests. The Department of Youth
              Services & Sports has given special emphasis on providing training
              to the Student-Youth of our state to make them prepared for
              meeting up the demand of the day. Keeping this demand in view, the
              Department of Youth Services & Sports is trying to expand the
              opportunities for availing different kinds of training. Thousands
              of student-youth have been receiving Computer / Vocational
              Training from the low cost YCTCs / YVTCs.
            </p>
            <p>
              Student - Youth festival is the largest cultural endeavour in our
              state which is organised all over the state by the Department of
              Youth Services & Sports. Student - Youth festival is a unique
              platform for searching young talent. The West Bengal
              Mountaineering & Adventure Sports Foundation under the Department
              of Youth Services & Sports accommodates the Student Youth in the
              adventure expedition and mountaineering programmes. Apart from
              this Sceintific Awareness and development of service, Club
              activities, a popular service - based programme are taken up
              regularly by the Department of Youth Services & Sports.
            </p>
            <p>
              Actually, all the programmes of Department of Youth Services &
              Sports are being formulated keeping in view the social demand and
              real scenario of the Student-Youth of the state.
            </p>
          </div>
        </WbContentWrapper>
      </WbPageWrapper>
    </>
  );
};
export default WbAboutDept;
