// Create component-specific data
var data = {};

/**
 * Render a heading component
 * @param {Object} data 11ty's data
 * @returns {HTMLElement} A rendered SVG icon
 */
function render(data) {
  return String.raw`
    <svg 
      data-h2-width="base(100%)"
      width="109" 
      height="94" 
      viewBox="0 0 109 94" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <g 
        filter="url(#filter0_d_12_6701)">
        <path 
          fill-rule="evenodd" 
          clip-rule="evenodd" 
          d="M87.4012 12.4513C86.2251 14.4885 84.0135 15.5553 81.815 15.3707L77.9213 22.1149C84.7903 22.1553 90.3462 27.7362 90.3462 34.6147V39.3963H90.5422C96.0651 39.3963 100.542 43.8735 100.542 49.3963V62.2314C100.542 67.7543 96.0651 72.2314 90.5422 72.2314H89.9902C88.6558 77.6992 83.7249 81.7574 77.8462 81.7574H30.8508C24.9721 81.7574 20.0412 77.6992 18.7068 72.2315H18.1548C12.6319 72.2315 8.15479 67.7543 8.15479 62.2315V49.3964C8.15479 43.8735 12.6319 39.3964 18.1548 39.3964H18.3508V34.6147C18.3508 27.7361 23.9068 22.1552 30.7758 22.1149L26.8821 15.3707C24.6836 15.5553 22.472 14.4885 21.2959 12.4513C19.6727 9.63999 20.636 6.04515 23.4473 4.42203C26.2586 2.79891 29.8535 3.76214 31.4766 6.57347C32.6527 8.61049 32.4709 11.0589 31.2121 12.8705L36.5492 22.1147H39.3486V21.9186C39.3486 16.3957 43.8257 11.9186 49.3486 11.9186H59.3484C64.8712 11.9186 69.3484 16.3957 69.3484 21.9186V22.1147H72.1479L77.485 12.8705C76.2262 11.0589 76.0444 8.61048 77.2205 6.57345C78.8436 3.76212 82.4385 2.79889 85.2498 4.42201C88.0611 6.04513 89.0244 9.63996 87.4012 12.4513Z" 
          data-h2-fill="base(primary)"/>
        <path 
          d="M81.815 15.3707L82.1079 11.8829L79.8945 11.6971L78.784 13.6207L81.815 15.3707ZM87.4012 12.4513L90.4323 14.2013V14.2013L87.4012 12.4513ZM77.9213 22.1149L74.8902 20.3649L71.8796 25.5794L77.9007 25.6148L77.9213 22.1149ZM90.3462 39.3963H86.8462V42.8963H90.3462V39.3963ZM89.9902 72.2314V68.7314H87.2417L86.59 71.4016L89.9902 72.2314ZM18.7068 72.2315L22.107 71.4016L21.4553 68.7315H18.7068V72.2315ZM18.3508 39.3964V42.8964H21.8508V39.3964H18.3508ZM30.7758 22.1149L30.7964 25.6148L36.8176 25.5795L33.8069 20.3649L30.7758 22.1149ZM26.8821 15.3707L29.9132 13.6207L28.8026 11.6971L26.5892 11.883L26.8821 15.3707ZM21.2959 12.4513L18.2648 14.2013L21.2959 12.4513ZM23.4473 4.42203L25.1973 7.45312L25.1973 7.45312L23.4473 4.42203ZM31.4766 6.57347L34.5077 4.82347V4.82347L31.4766 6.57347ZM31.2121 12.8705L28.3378 10.8733L27.0705 12.6971L28.181 14.6205L31.2121 12.8705ZM36.5492 22.1147L33.5181 23.8647L34.5285 25.6147H36.5492V22.1147ZM39.3486 22.1147V25.6147H42.8486V22.1147H39.3486ZM69.3484 22.1147H65.8484V25.6147H69.3484V22.1147ZM72.1479 22.1147V25.6147H74.1686L75.179 23.8647L72.1479 22.1147ZM77.485 12.8705L80.5161 14.6205L81.6266 12.6971L80.3593 10.8733L77.485 12.8705ZM77.2205 6.57345L80.2516 8.32345V8.32344L77.2205 6.57345ZM81.5222 18.8584C85.0209 19.1521 88.5531 17.4561 90.4323 14.2013L84.3701 10.7013C83.897 11.5208 83.0061 11.9584 82.1079 11.8829L81.5222 18.8584ZM80.9523 23.8649L84.8461 17.1207L78.784 13.6207L74.8902 20.3649L80.9523 23.8649ZM93.8462 34.6147C93.8462 25.8101 86.7346 18.6667 77.9418 18.615L77.9007 25.6148C82.8459 25.6439 86.8462 29.6623 86.8462 34.6147H93.8462ZM93.8462 39.3963V34.6147H86.8462V39.3963H93.8462ZM90.5422 35.8963H90.3462V42.8963H90.5422V35.8963ZM104.042 49.3963C104.042 41.9405 97.9981 35.8963 90.5422 35.8963V42.8963C94.1321 42.8963 97.0422 45.8065 97.0422 49.3963H104.042ZM104.042 62.2314V49.3963H97.0422V62.2314H104.042ZM90.5422 75.7314C97.9981 75.7314 104.042 69.6873 104.042 62.2314H97.0422C97.0422 65.8213 94.1321 68.7314 90.5422 68.7314V75.7314ZM89.9902 75.7314H90.5422V68.7314H89.9902V75.7314ZM77.8462 85.2574C85.3756 85.2574 91.6824 80.0598 93.3904 73.0613L86.59 71.4016C85.6292 75.3386 82.0742 78.2574 77.8462 78.2574V85.2574ZM30.8508 85.2574H77.8462V78.2574H30.8508V85.2574ZM15.3066 73.0613C17.0146 80.0599 23.3214 85.2574 30.8508 85.2574V78.2574C26.6228 78.2574 23.0678 75.3386 22.107 71.4016L15.3066 73.0613ZM18.1548 75.7315H18.7068V68.7315H18.1548V75.7315ZM4.65479 62.2315C4.65479 69.6873 10.6989 75.7315 18.1548 75.7315V68.7315C14.5649 68.7315 11.6548 65.8213 11.6548 62.2315H4.65479ZM4.65479 49.3964V62.2315H11.6548V49.3964H4.65479ZM18.1548 35.8964C10.6989 35.8964 4.65479 41.9405 4.65479 49.3964H11.6548C11.6548 45.8065 14.5649 42.8964 18.1548 42.8964V35.8964ZM18.3508 35.8964H18.1548V42.8964H18.3508V35.8964ZM14.8508 34.6147V39.3964H21.8508V34.6147H14.8508ZM30.7553 18.615C21.9624 18.6666 14.8508 25.81 14.8508 34.6147H21.8508C21.8508 29.6622 25.8512 25.6439 30.7964 25.6148L30.7553 18.615ZM23.851 17.1207L27.7448 23.8649L33.8069 20.3649L29.9132 13.6207L23.851 17.1207ZM18.2648 14.2013C20.144 17.4562 23.6762 19.1522 27.1749 18.8584L26.5892 11.883C25.691 11.9584 24.8001 11.5209 24.3269 10.7013L18.2648 14.2013ZM21.6973 1.39094C17.2119 3.98056 15.6751 9.71596 18.2648 14.2013L24.3269 10.7013C23.6703 9.56401 24.06 8.10974 25.1973 7.45312L21.6973 1.39094ZM34.5077 4.82347C31.9181 0.338119 26.1827 -1.19868 21.6973 1.39094L25.1973 7.45312C26.3346 6.7965 27.7889 7.18617 28.4455 8.32347L34.5077 4.82347ZM34.0863 14.8676C36.0896 11.9846 36.3867 8.07803 34.5077 4.82347L28.4455 8.32347C28.9186 9.14295 28.8521 10.1331 28.3378 10.8733L34.0863 14.8676ZM39.5803 20.3647L34.2432 11.1205L28.181 14.6205L33.5181 23.8647L39.5803 20.3647ZM39.3486 18.6147H36.5492V25.6147H39.3486V18.6147ZM35.8486 21.9186V22.1147H42.8486V21.9186H35.8486ZM49.3486 8.41857C41.8927 8.41857 35.8486 14.4627 35.8486 21.9186H42.8486C42.8486 18.3287 45.7587 15.4186 49.3486 15.4186V8.41857ZM59.3484 8.41857H49.3486V15.4186H59.3484V8.41857ZM72.8484 21.9186C72.8484 14.4627 66.8042 8.41857 59.3484 8.41857V15.4186C62.9382 15.4186 65.8484 18.3287 65.8484 21.9186H72.8484ZM72.8484 22.1147V21.9186H65.8484V22.1147H72.8484ZM72.1479 18.6147H69.3484V25.6147H72.1479V18.6147ZM74.4539 11.1205L69.1168 20.3647L75.179 23.8647L80.5161 14.6205L74.4539 11.1205ZM74.1894 4.82345C72.3104 8.07802 72.6075 11.9846 74.6108 14.8677L80.3593 10.8733C79.8449 10.1331 79.7785 9.14294 80.2516 8.32345L74.1894 4.82345ZM86.9998 1.39092C82.5144 -1.1987 76.779 0.338091 74.1894 4.82345L80.2516 8.32344C80.9082 7.18615 82.3625 6.79647 83.4998 7.4531L86.9998 1.39092ZM90.4323 14.2013C93.0219 9.71594 91.4851 3.98054 86.9998 1.39092L83.4998 7.4531C84.6371 8.10972 85.0268 9.56399 84.3701 10.7013L90.4323 14.2013Z" 
          data-h2-fill="base:all(white)"/>
      </g>
      <path 
        d="M20.8506 69.2575V34.6147C20.8506 29.0919 25.3277 24.6147 30.8506 24.6147H77.8459C83.3688 24.6147 87.8459 29.0919 87.8459 34.6147V69.2575C87.8459 74.7804 83.3688 79.2575 77.8459 79.2575H30.8506C25.3277 79.2575 20.8506 74.7804 20.8506 69.2575Z" 
        data-h2-fill="base:all(white)" 
        data-h2-stroke="base(primary)" 
        stroke-width="5" 
        stroke-linecap="round"/>
      <circle 
        cx="34.1553" 
        cy="58.2266" 
        r="6.29054" 
        data-h2-fill="base(primary)"/>
      <circle 
        cx="74.5415" 
        cy="58.2266" 
        r="6.29054" 
        data-h2-fill="base(primary)"/>
      <path 
        d="M8.15479 49.3964C8.15479 43.8735 12.6319 39.3964 18.1548 39.3964H20.8508V72.2315H18.1548C12.6319 72.2315 8.15479 67.7543 8.15479 62.2315V49.3964Z" 
        data-h2-fill="base(primary)"/>
      <path 
        d="M100.542 62.2314C100.542 67.7543 96.0648 72.2314 90.542 72.2314L87.846 72.2314L87.846 39.3963L90.542 39.3963C96.0648 39.3963 100.542 43.8735 100.542 49.3963L100.542 62.2314Z" 
        data-h2-fill="base(primary)"/>
      <path 
        d="M59.3482 11.9186C64.871 11.9186 69.3481 16.3957 69.3481 21.9186L69.3481 24.6146L39.3483 24.6146L39.3483 21.9186C39.3483 16.3957 43.8255 11.9186 49.3483 11.9186L59.3482 11.9186Z" 
        data-h2-fill="base(primary)"/>
      <path 
        d="M30.0298 10.8228L28.7798 8.65769L24.4497 11.1577L25.6997 13.3228L30.0298 10.8228ZM32.9408 25.8647C33.6311 27.0604 35.1601 27.4701 36.3558 26.7797C37.5515 26.0894 37.9612 24.5604 37.2709 23.3647L32.9408 25.8647ZM25.6997 13.3228L32.9408 25.8647L37.2709 23.3647L30.0298 10.8228L25.6997 13.3228Z" 
        data-h2-fill="base(primary)"/>
      <circle 
        cx="26.3862" 
        cy="9.5124" 
        r="5.87785" 
        transform="rotate(-30 26.3862 9.5124)" 
        data-h2-fill="base(primary)"/>
      <path 
        d="M82.9971 13.3229L84.2471 11.1578L79.917 8.65781L78.667 10.8229L82.9971 13.3229ZM71.4259 23.3648C70.7355 24.5605 71.1452 26.0895 72.341 26.7798C73.5367 27.4702 75.0657 27.0605 75.756 25.8648L71.4259 23.3648ZM78.667 10.8229L71.4259 23.3648L75.756 25.8648L82.9971 13.3229L78.667 10.8229Z" 
        data-h2-fill="base(primary)"/>
      <circle 
        cx="82.3106" 
        cy="9.51244" 
        r="5.87785" 
        transform="rotate(30 82.3106 9.51244)" 
        data-h2-fill="base(primary)"/>
      <path 
        d="M45.874 65.4535L47.2776 66.857C51.1828 70.7622 57.5144 70.7622 61.4197 66.857L62.8232 65.4535" 
        data-h2-stroke="base(primary)" 
        stroke-width="5" 
        stroke-miterlimit="16" 
        stroke-linecap="round"/>
      <defs>
        <filter 
          id="filter0_d_12_6701" 
          x="0.654785" 
          y="0.132935" 
          width="107.387" 
          height="93.1245" 
          filterUnits="userSpaceOnUse" 
          color-interpolation-filters="sRGB">
          <feFlood 
            flood-opacity="0" 
            result="BackgroundImageFix"/>
          <feColorMatrix 
            in="SourceAlpha" 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
            result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite 
            in2="hardAlpha" 
            operator="out"/>
          <feColorMatrix 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend 
            mode="normal" 
            in2="BackgroundImageFix" 
            result="effect1_dropShadow_12_6701"/>
          <feBlend 
            mode="normal" 
            in="SourceGraphic" 
            in2="effect1_dropShadow_12_6701" 
            result="shape"/>
        </filter>
      </defs>
    </svg>
  `;
}

module.exports = {
  data,
  render,
};