import React from "react";

import { useConfigProvider } from "@vkontakte/vkui";

export function JSLesson() {
  const { appearance } = useConfigProvider();
  const color = appearance === "dark" ? "black" : "white";

  return (
    <svg viewBox="0 0 624 442" fill="none">
      <g clipPath="url(#clip0_601_3020)">
        <path
          d="M75.8799 79.28C75.8799 91.84 82.8399 99.04 94.9199 99.04C106.92 99.04 113.88 91.6 113.88 79.04V40H104.76V78.96C104.76 88.32 100.28 91.6 94.9199 91.6C88.9199 91.6 84.6799 87.36 84.6799 79.28H75.8799ZM138.786 40L117.266 98H126.546L131.026 85.28H156.226L160.786 98H170.706L148.866 40H138.786ZM133.746 77.6L143.506 49.92L153.426 77.6H133.746ZM175.949 40H165.949L185.949 98H196.269L216.029 40H206.429L191.389 87.84L175.949 40ZM233.629 40L212.109 98H221.389L225.869 85.28H251.069L255.629 98H265.549L243.709 40H233.629ZM228.589 77.6L238.349 49.92L248.269 77.6H228.589ZM285.947 71.12L293.067 72.56C299.307 73.84 305.067 76.24 305.067 82.24C305.067 87.84 299.787 91.44 292.267 91.44C284.107 91.44 278.747 87.36 277.067 79.44H268.107C269.467 91.6 278.507 99.04 291.947 99.04C303.227 99.04 314.267 93.04 314.267 81.52C314.267 69.84 304.107 66.32 294.827 64.4L287.947 62.96C282.987 61.92 279.147 59.44 279.147 54.64C279.147 48.56 286.427 46.56 290.667 46.56C296.187 46.56 302.507 48.64 304.347 55.52H313.147C310.907 43.84 301.707 38.96 291.067 38.96C281.307 38.96 269.867 44.08 269.867 55.04C269.867 64.8 277.707 69.44 285.947 71.12ZM372.706 79.12H363.906C362.146 86.8 356.466 91.44 347.906 91.44C337.826 91.44 330.466 83.2 330.466 68.88C330.466 54.32 338.066 46.56 347.826 46.56C356.306 46.56 361.906 51.36 363.666 58.88H372.466C370.066 46.16 360.626 38.96 348.226 38.96C331.586 38.96 321.106 50.72 321.106 68.88C321.106 86.72 330.866 99.04 347.666 99.04C360.546 99.04 370.226 92 372.706 79.12ZM404.593 73.52L416.993 98H427.233L413.873 72C421.073 69.76 425.073 65.04 425.073 56.72C425.073 43.28 415.712 40 400.113 40H381.713V98H390.833V73.6H400.833C402.113 73.6 403.393 73.6 404.593 73.52ZM390.833 47.52H401.153C409.393 47.52 415.712 48.56 415.712 56.88C415.712 64.88 409.873 66.16 401.313 66.16H390.833V47.52ZM445.129 98V40H436.009V98H445.129ZM476.603 40H457.963V98H467.083V75.52H476.603C490.603 75.52 500.923 72.4 500.923 57.84C500.923 42.64 490.043 40 476.603 40ZM467.083 47.52H476.923C484.763 47.52 491.483 48.48 491.483 57.92C491.483 66.88 485.243 67.84 477.163 67.84H467.083V47.52ZM521.066 47.76V98H530.186V47.76H548.746V40H502.426V47.76H521.066Z"
          fill={color}
        />
        <path
          d="M520.939 229.061C521.525 229.646 522.475 229.646 523.061 229.061L532.607 219.515C533.192 218.929 533.192 217.979 532.607 217.393C532.021 216.808 531.071 216.808 530.485 217.393L522 225.879L513.515 217.393C512.929 216.808 511.979 216.808 511.393 217.393C510.808 217.979 510.808 218.929 511.393 219.515L520.939 229.061ZM520.5 134V228H523.5V134H520.5Z"
          fill={color}
        />
        <path
          d="M386.939 229.061C387.525 229.646 388.475 229.646 389.061 229.061L398.607 219.515C399.192 218.929 399.192 217.979 398.607 217.393C398.021 216.808 397.071 216.808 396.485 217.393L388 225.879L379.515 217.393C378.929 216.808 377.979 216.808 377.393 217.393C376.808 217.979 376.808 218.929 377.393 219.515L386.939 229.061ZM386.5 134V228H389.5V134H386.5Z"
          fill={color}
        />
        <path
          d="M250.939 229.061C251.525 229.646 252.475 229.646 253.061 229.061L262.607 219.515C263.192 218.929 263.192 217.979 262.607 217.393C262.021 216.808 261.071 216.808 260.485 217.393L252 225.879L243.515 217.393C242.929 216.808 241.979 216.808 241.393 217.393C240.808 217.979 240.808 218.929 241.393 219.515L250.939 229.061ZM250.5 134V228H253.5V134H250.5Z"
          fill={color}
        />
        <path
          d="M114.939 229.061C115.525 229.646 116.475 229.646 117.061 229.061L126.607 219.515C127.192 218.929 127.192 217.979 126.607 217.393C126.021 216.808 125.071 216.808 124.485 217.393L116 225.879L107.515 217.393C106.929 216.808 105.979 216.808 105.393 217.393C104.808 217.979 104.808 218.929 105.393 219.515L114.939 229.061ZM114.5 134V228H117.5V134H114.5Z"
          fill={color}
        />
        <path
          d="M76.6998 297C76.6998 305.158 70.3036 311.7 62.4998 311.7C54.696 311.7 48.2998 305.158 48.2998 297C48.2998 288.842 54.696 282.3 62.4998 282.3C70.3036 282.3 76.6998 288.842 76.6998 297Z"
          fill={color}
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M450 311.7C458.118 311.7 464.7 305.118 464.7 297C464.7 288.881 458.118 282.3 450 282.3C441.881 282.3 435.3 288.881 435.3 297C435.3 305.118 441.881 311.7 450 311.7Z"
          fill={color}
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M251.7 378C251.7 386.158 245.304 392.7 237.5 392.7C229.696 392.7 223.3 386.158 223.3 378C223.3 369.842 229.696 363.3 237.5 363.3C245.304 363.3 251.7 369.842 251.7 378Z"
          fill={color}
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M132 365.7C140.118 365.7 146.7 359.118 146.7 351C146.7 342.881 140.118 336.3 132 336.3C123.881 336.3 117.3 342.881 117.3 351C117.3 359.118 123.881 365.7 132 365.7Z"
          fill={color}
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M561.7 365.5C561.7 373.304 555.158 379.7 547 379.7C538.842 379.7 532.3 373.304 532.3 365.5C532.3 357.696 538.842 351.3 547 351.3C555.158 351.3 561.7 357.696 561.7 365.5Z"
          fill={color}
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M206.5 300.7C214.342 300.7 220.7 294.342 220.7 286.5C220.7 278.657 214.342 272.3 206.5 272.3C198.657 272.3 192.3 278.657 192.3 286.5C192.3 294.342 198.657 300.7 206.5 300.7Z"
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M92.6998 382.5C92.6998 390.304 86.1576 396.7 77.9998 396.7C69.842 396.7 63.2998 390.304 63.2998 382.5C63.2998 374.696 69.842 368.3 77.9998 368.3C86.1576 368.3 92.6998 374.696 92.6998 382.5Z"
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M333.5 342.7C341.342 342.7 347.7 336.342 347.7 328.5C347.7 320.657 341.342 314.3 333.5 314.3C325.657 314.3 319.3 320.657 319.3 328.5C319.3 336.342 325.657 342.7 333.5 342.7Z"
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M562.5 300.7C570.342 300.7 576.7 294.342 576.7 286.5C576.7 278.657 570.342 272.3 562.5 272.3C554.657 272.3 548.3 278.657 548.3 286.5C548.3 294.342 554.657 300.7 562.5 300.7Z"
          stroke={color}
          strokeWidth="2.6"
        />
        <path
          d="M429 392.7C437.118 392.7 443.7 386.118 443.7 378C443.7 369.881 437.118 363.3 429 363.3C420.881 363.3 414.3 369.881 414.3 378C414.3 386.118 420.881 392.7 429 392.7Z"
          stroke={color}
          strokeWidth="2.6"
        />
      </g>
      <defs>
        <clipPath id="clip0_601_3020">
          <rect width="624" height="442" />
        </clipPath>
      </defs>
    </svg>
  );
}