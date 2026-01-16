import React, { useState } from 'react';
import { TTSTool } from './components/TTSTool';
import { Mic2, MessageCircle, Globe, Users, Zap } from 'lucide-react';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'landing' | 'tool'>('landing');
    const [menuOpen, setMenuOpen] = useState(false);

    // Logos provided in template
    const companiesLogo = [
        { logo: (<svg className="h-7 w-auto max-w-xs" width="128" height="42" viewBox="0 0 128 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H27.7325V14H13.8663L0 0ZM0 14H13.8663L27.7325 28H0V14ZM0 28H13.8663V42L0 28Z" fill="#90A1B9" /><path d="M43.3801 11.0446H54.5901V14.6412H47.6231V19.6392H54.5901V23.1564H47.6231V29.5559H43.3801V11.0446ZM56.8949 16.8094H60.9025V19.4804C61.1118 18.5625 61.5401 17.8579 62.1859 17.3647C62.8482 16.8529 63.5835 16.598 64.386 16.598C64.8054 16.598 65.1549 16.6339 65.4334 16.7037V20.4591C65.0337 20.4104 64.6315 20.3842 64.2287 20.3797C63.1286 20.3797 62.3001 20.7403 61.7405 21.4634C61.1829 22.1687 60.9025 23.2262 60.9025 24.6373V29.5559H56.8968V16.8094H56.8949ZM71.7597 29.8998C70.5379 29.8998 69.4721 29.6084 68.5642 29.0268C67.6735 28.4452 66.9655 27.6196 66.5214 26.6466C66.0501 25.625 65.8128 24.4688 65.8128 23.1826C65.8128 21.9131 66.059 20.7666 66.5474 19.7449C67.0055 18.7579 67.7325 17.9233 68.6429 17.3385C69.5672 16.7569 70.6241 16.4654 71.8124 16.4654C72.7025 16.4654 73.498 16.6601 74.1959 17.0477C74.8937 17.4365 75.4177 17.9655 75.7673 18.6342V16.8094H79.7482V29.5559H75.7673V27.7573C75.4177 28.392 74.8766 28.9115 74.1432 29.3176C73.4098 29.7102 72.5902 29.9101 71.7597 29.8998ZM72.9125 26.5409C73.8723 26.5409 74.6146 26.2238 75.1386 25.5891C75.6626 24.9543 75.9246 24.1517 75.9246 23.1826C75.9246 22.2308 75.6626 21.4372 75.1386 20.8024C74.6146 20.1677 73.8723 19.8506 72.9125 19.8506C72.0033 19.8506 71.2712 20.1587 70.7123 20.7762C70.1712 21.3936 69.9003 22.1949 69.9003 23.1826C69.9003 24.1703 70.1712 24.9806 70.7123 25.6153C71.2712 26.2328 72.0046 26.5409 72.9125 26.5409ZM82.551 16.8094H86.5586V18.6605C86.839 18.0072 87.2919 17.4781 87.92 17.0739C88.5671 16.6697 89.3176 16.4654 90.1728 16.4654C92.1636 16.4654 93.4825 17.2494 94.1277 18.8194C94.483 18.1077 95.0387 17.5191 95.7258 17.1271C96.4604 16.6806 97.3042 16.452 98.1613 16.4654C101.147 16.4654 102.64 18.1923 102.64 21.6486V29.5559H98.6066V22.389C98.6066 21.5262 98.4493 20.8915 98.1352 20.4854C97.8206 20.0805 97.3492 19.8769 96.7205 19.8769C96.0398 19.8769 95.5158 20.1151 95.1491 20.591C94.7824 21.0497 94.5991 21.851 94.5991 22.9975V29.5559H90.5655V22.3627C90.5655 21.4993 90.4088 20.8729 90.0941 20.4854C89.7985 20.0805 89.3347 19.8769 88.7073 19.8769C88.0082 19.8769 87.4753 20.1151 87.1086 20.591C86.7419 21.0497 86.5586 21.851 86.5586 22.9975V29.5559H82.5523V16.8094H82.551ZM117.695 22.5216C117.695 23.0673 117.659 23.6585 117.588 24.2933H108.265C108.301 25.1221 108.58 25.7556 109.104 26.1976C109.628 26.6376 110.336 26.8586 111.225 26.8586C112.465 26.8586 113.251 26.4788 113.582 25.721H117.511C117.318 26.9733 116.638 27.9859 115.468 28.7623C114.316 29.52 112.901 29.8998 111.225 29.8998C109.06 29.8998 107.358 29.3086 106.117 28.1275C104.896 26.9457 104.284 25.2983 104.284 23.1826C104.284 21.8074 104.563 20.6173 105.122 19.6123C105.662 18.6086 106.494 17.7964 107.505 17.2853C108.536 16.7396 109.732 16.4654 111.096 16.4654C112.387 16.4654 113.53 16.721 114.525 17.2328C115.538 17.7445 116.315 18.4581 116.856 19.3747C117.416 20.2926 117.695 21.3411 117.695 22.5216ZM113.738 21.7812C113.721 20.935 113.485 20.2906 113.031 19.8506C112.578 19.4106 111.922 19.1896 111.066 19.1896C110.211 19.1896 109.53 19.4272 109.024 19.9038C108.535 20.3624 108.282 20.9875 108.264 21.7812H113.738ZM119.462 16.8094H123.469V19.4804C123.678 18.5625 124.107 17.8579 124.752 17.3647C125.379 16.8664 126.155 16.5961 126.953 16.598C127.371 16.598 127.721 16.6339 128 16.7037V20.4591C127.6 20.4104 127.198 20.3842 126.795 20.3797C125.695 20.3797 124.867 20.7403 124.307 21.4634C123.748 22.1687 123.469 23.2262 123.469 24.6373V29.5559H119.462V16.8094Z" fill="#90A1B9" /></svg>), },
        { logo: (<svg className="h-7 w-auto max-w-xs" width="131" height="32" viewBox="0 0 131 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M116.105 10.5118C116.836 10.5118 117.439 10.1314 117.52 9.63989L118.242 1.47037C118.242 0.662892 117.296 0 116.107 0C114.919 0 113.974 0.662889 113.974 1.47051L114.696 9.63989C114.775 10.1312 115.377 10.5118 116.107 10.5118H116.105ZM111.689 13.0635C112.056 12.4307 112.029 11.7194 111.642 11.4034L104.927 6.69304C104.229 6.28871 103.182 6.77538 102.588 7.80572C101.992 8.83475 102.098 9.98402 102.794 10.3885L110.229 13.8504C110.694 14.0227 111.328 13.6911 111.692 13.0587L111.689 13.0635ZM120.524 13.0591C120.89 13.6916 121.521 14.0233 121.986 13.8509L129.422 10.3889C130.122 9.9846 130.222 8.83519 129.631 7.80616C129.034 6.77684 127.986 6.28915 127.289 6.69347L120.574 11.4038C120.19 11.7194 120.161 12.4312 120.526 13.064L120.524 13.0591ZM116.105 20.7168C116.836 20.7168 117.439 21.094 117.52 21.5859L118.242 29.7543C118.242 30.5642 117.296 31.2257 116.107 31.2257C114.919 31.2257 113.974 30.5642 113.974 29.7543L114.696 21.5859C114.775 21.094 115.377 20.7168 116.107 20.7168H116.105ZM120.524 18.1645C120.89 17.5303 121.521 17.2015 121.986 17.3758L129.422 20.8354C130.122 21.2402 130.222 22.3906 129.631 23.4205C129.034 24.4465 127.986 24.9355 127.289 24.5317L120.574 19.8258C120.19 19.5077 120.161 18.7954 120.526 18.1632H120.523M111.689 18.1636C112.056 18.7954 112.029 19.5077 111.642 19.8264L104.927 24.5322C104.229 24.9359 103.182 24.4469 102.588 23.421C101.992 22.3911 102.098 21.2406 102.794 20.8359L110.229 17.3762C110.694 17.2019 111.328 17.5307 111.692 18.1651H111.689" fill="#90A1B9" /><path d="M73.7477 19.8106C73.7477 20.0613 73.7254 20.3198 73.6567 20.5469C73.3719 21.4901 72.3954 22.2877 71.1737 22.2877C70.155 22.2877 69.3459 21.709 69.3459 20.4869C69.3459 18.6164 71.4047 18.0999 73.7483 18.1128L73.7477 19.8104V19.8106ZM77.4236 16.5509C77.4236 13.4666 76.1057 10.7527 71.6526 10.7527C69.3667 10.7527 67.5525 11.3947 66.5623 11.967L67.2876 14.4465C68.1925 13.8752 69.6349 13.4022 70.9999 13.4022C73.2587 13.3959 73.6286 14.6813 73.6286 15.504V15.6987C68.7049 15.6914 65.5924 17.3963 65.5924 20.8693C65.5924 22.9915 67.1777 24.9792 69.9333 24.9792C71.6265 24.9792 73.0447 24.3033 73.8934 23.2196H73.9772C73.9772 23.2196 74.5388 25.5724 77.6392 24.6722C77.4774 23.6938 77.4242 22.6493 77.4242 21.3933L77.4237 16.5509M0.707031 6.55234C0.707031 6.55234 3.92456 19.7364 4.43834 21.8761C5.03768 24.3736 6.11787 25.293 9.23074 24.6722L11.2397 16.4986C11.7491 14.4674 12.09 13.0192 12.4182 10.955H12.4754C12.7058 13.041 13.0327 14.4736 13.4519 16.5053C13.4519 16.5053 14.2693 20.2162 14.6886 22.1647C15.1084 24.1125 16.2768 25.3409 19.3263 24.6722L24.1134 6.55176H20.2495L18.6144 14.3865C18.1748 16.6661 17.7763 18.4494 17.4688 20.5344H17.4141C17.1347 18.4677 16.7789 16.7572 16.3325 14.5356L14.6315 6.55176H10.6049L8.78444 14.3343C8.2692 16.6999 7.78602 18.6093 7.47994 20.6249H7.42426C7.11001 18.7269 6.6917 16.3262 6.23899 14.0374C6.23899 14.0374 5.15822 8.47061 4.77809 6.55176L0.707031 6.55234ZM31.4224 19.8106C31.4224 20.0613 31.4001 20.3198 31.3304 20.5469C31.0462 21.4901 30.0691 22.2877 28.8474 22.2877C27.8285 22.2877 27.0206 21.709 27.0206 20.4869C27.0206 18.6164 29.0788 18.0999 31.4228 18.1128L31.4224 19.8104V19.8106ZM35.0979 16.5509C35.0979 13.4666 33.78 10.7527 29.3278 10.7527C27.0413 10.7527 25.2257 11.3947 24.236 11.967L24.9604 14.4465C25.8652 13.8752 27.3076 13.4022 28.673 13.4022C30.9334 13.3959 31.3033 14.6813 31.3033 15.504V15.6987C26.3776 15.6914 23.2666 17.3963 23.2666 20.8693C23.2666 22.9915 24.8509 24.9792 27.6045 24.9792C29.3001 24.9792 30.7174 24.3033 31.5671 23.2196H31.6499C31.6499 23.2196 32.2131 25.5724 35.3127 24.6722C35.1507 23.6938 35.0979 22.6493 35.0979 21.3933V16.5509ZM41.2321 20.8258V6.55234H37.5518V24.6728H41.2321V20.8258ZM89.3771 6.55234V19.9195C89.3771 21.7633 89.7247 23.0536 90.4658 23.8433C91.1153 24.5338 92.1824 24.9806 93.4621 24.9806C94.5506 24.9806 95.6207 24.7729 96.1258 24.5856L96.0782 21.7105C95.7025 21.8023 95.2711 21.8766 94.6805 21.8766C93.4264 21.8766 93.0071 21.0733 93.0071 19.4188V14.3043H96.2119V10.8368H93.0071V6.55234H89.3771ZM79.8777 11.0601V24.6728H83.6741V17.7028C83.6741 17.3261 83.6969 16.9978 83.7565 16.6976C84.0373 15.2368 85.1538 14.3043 86.7576 14.3043C87.1971 14.3043 87.5118 14.3521 87.8528 14.4005V10.8368C87.5666 10.7798 87.3725 10.7531 87.0166 10.7531C85.5998 10.7531 83.9879 11.6673 83.3115 13.6283H83.2089V11.0601H79.8777ZM43.809 11.0601V24.6728H47.5078V16.6903C47.5078 16.3157 47.5519 15.9195 47.6816 15.5761C47.9881 14.7724 48.7361 13.8312 49.9297 13.8312C51.4229 13.8312 52.1202 15.093 52.1202 16.914V24.6718H55.8161V16.592C55.8161 16.2347 55.8649 15.8038 55.9706 15.4887C56.2741 14.5739 57.0798 13.8301 58.1896 13.8301C59.7027 13.8301 60.4289 15.0698 60.4289 17.2132V24.6713H64.1273V16.6534C64.1273 12.4255 61.9804 10.7518 59.5565 10.7518C58.484 10.7518 57.6366 11.0204 56.8702 11.4901C56.2267 11.8865 55.6495 12.4482 55.1459 13.1866H55.0913C54.5068 11.7196 53.1316 10.7525 51.3396 10.7525C49.0374 10.7525 48.0027 11.9196 47.3751 12.9093H47.32V11.0596H43.809" fill="#90A1B9" /></svg>), },
        { logo: (<svg className="h-7 w-auto max-w-xs" width="131" height="28" viewBox="0 0 131 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M54.4798 5.59999V22.4H51.5696V9.21666H51.5308L46.3311 22.4H44.391L39.0749 9.21666H39.0361V22.4H36.3588V5.59999H40.5494L45.3611 18.0445H45.4387L50.5219 5.59999H54.4798ZM56.8856 6.88333C56.8856 6.41666 57.0408 6.02777 57.3901 5.71666C57.7393 5.40555 58.1273 5.24999 58.593 5.24999C59.0974 5.24999 59.5243 5.40555 59.8347 5.71666C60.1451 6.02777 60.3391 6.41666 60.3391 6.88333C60.3391 7.34999 60.1839 7.73888 59.8347 8.04999C59.4855 8.36111 59.0974 8.51666 58.593 8.51666C58.0885 8.51666 57.7005 8.36111 57.3901 8.04999C57.0797 7.69999 56.8856 7.31111 56.8856 6.88333ZM60.0287 10.3444V22.4H57.1961V10.3444H60.0287ZM68.6042 20.3389C69.0311 20.3389 69.4967 20.2611 70.0012 20.0278C70.5056 19.8333 70.9712 19.5611 71.3981 19.25V21.8944C70.9324 22.1666 70.428 22.3611 69.8459 22.4777C69.2639 22.5944 68.643 22.6722 67.9446 22.6722C66.1596 22.6722 64.7239 22.1278 63.6374 21C62.5121 19.8722 61.9689 18.4333 61.9689 16.7222C61.9689 14.7778 62.5509 13.1833 63.6762 11.9389C64.8015 10.6944 66.3925 10.0722 68.4878 10.0722C69.0311 10.0722 69.5743 10.15 70.0788 10.2667C70.622 10.3833 71.0489 10.5778 71.3593 10.7333V13.4555C70.9324 13.1444 70.4668 12.8722 70.04 12.7167C69.5743 12.5611 69.1087 12.4444 68.643 12.4444C67.5178 12.4444 66.6253 12.7944 65.9268 13.5333C65.2283 14.2722 64.9179 15.2444 64.9179 16.4889C64.9179 17.6945 65.2672 18.6667 65.9268 19.3278C66.5865 19.9889 67.4789 20.3389 68.6042 20.3389ZM79.4304 10.15C79.6632 10.15 79.8572 10.15 80.0512 10.1889C80.2452 10.2278 80.4005 10.2667 80.5169 10.3056V13.1833C80.3617 13.0667 80.1676 12.95 79.8572 12.8722C79.5468 12.7944 79.2364 12.7167 78.8095 12.7167C78.1111 12.7167 77.529 13.0278 77.0634 13.6111C76.5977 14.1944 76.3261 15.0889 76.3261 16.3333V22.4H73.4935V10.3444H76.3261V12.25H76.3649C76.6365 11.5889 77.0246 11.0833 77.529 10.6944C78.0723 10.3444 78.6931 10.15 79.4304 10.15ZM80.6721 16.5666C80.6721 14.5833 81.2541 12.9889 82.3406 11.8222C83.4659 10.6556 85.0181 10.0722 86.997 10.0722C88.8596 10.0722 90.3341 10.6167 91.3818 11.7444C92.4295 12.8722 92.9727 14.3889 92.9727 16.2944C92.9727 18.2389 92.3907 19.7945 91.3042 20.9611C90.1789 22.1278 88.6656 22.7111 86.7254 22.7111C84.8628 22.7111 83.3883 22.1667 82.3018 21.0778C81.2153 19.95 80.6721 18.4333 80.6721 16.5666ZM83.6211 16.45C83.6211 17.6944 83.8928 18.6667 84.4748 19.3278C85.0569 19.9889 85.8717 20.3389 86.9194 20.3389C87.9283 20.3389 88.7432 20.0278 89.2864 19.3278C89.8297 18.6667 90.1013 17.6944 90.1013 16.3722C90.1013 15.0889 89.8297 14.1167 89.2864 13.4167C88.7432 12.7556 87.9283 12.4056 86.9582 12.4056C85.9105 12.4056 85.1345 12.7555 84.5524 13.4555C83.8928 14.1944 83.6211 15.1666 83.6211 16.45ZM97.2023 13.5333C97.2023 13.9222 97.3187 14.2722 97.5903 14.5055C97.862 14.7389 98.4052 15.0111 99.2977 15.3611C100.423 15.8278 101.238 16.3333 101.665 16.8778C102.13 17.4611 102.363 18.1222 102.363 18.9389C102.363 20.0667 101.936 20.9611 101.044 21.6611C100.19 22.3611 98.9872 22.6722 97.5127 22.6722C97.0083 22.6722 96.465 22.5944 95.8442 22.4777C95.2233 22.3611 94.7189 22.2055 94.292 22.0111V19.2111C94.7965 19.5611 95.3785 19.8722 95.9606 20.0666C96.5426 20.2611 97.0859 20.3778 97.5903 20.3778C98.2112 20.3778 98.7156 20.3 98.9873 20.1056C99.2977 19.9111 99.4529 19.6389 99.4529 19.2111C99.4529 18.8222 99.2977 18.5111 98.9873 18.2C98.6768 17.9277 98.056 17.6167 97.2023 17.2667C96.1546 16.8389 95.4173 16.3333 94.9905 15.7889C94.5637 15.2444 94.3308 14.5444 94.3308 13.6889C94.3308 12.6 94.7577 11.7055 95.6114 11.0055C96.465 10.3055 97.5903 9.95555 98.9484 9.95555C99.3753 9.95555 99.8409 9.99444 100.345 10.1111C100.85 10.2278 101.315 10.3444 101.665 10.4611V13.2222C101.277 12.9889 100.85 12.7555 100.345 12.5611C99.8409 12.3666 99.3365 12.2889 98.8708 12.2889C98.3276 12.2889 97.9008 12.4056 97.6291 12.6C97.3575 12.8722 97.2023 13.1444 97.2023 13.5333ZM103.566 16.5666C103.566 14.5833 104.148 12.9889 105.235 11.8222C106.36 10.6556 107.912 10.0722 109.891 10.0722C111.754 10.0722 113.228 10.6167 114.276 11.7444C115.323 12.8722 115.867 14.3889 115.867 16.2944C115.867 18.2389 115.285 19.7945 114.198 20.9611C113.073 22.1278 111.56 22.7111 109.619 22.7111C107.757 22.7111 106.282 22.1667 105.196 21.0778C104.148 19.95 103.566 18.4333 103.566 16.5666ZM106.515 16.45C106.515 17.6944 106.787 18.6667 107.369 19.3278C107.951 19.9889 108.766 20.3389 109.813 20.3389C110.822 20.3389 111.637 20.0278 112.18 19.3278C112.724 18.6667 112.995 17.6944 112.995 16.3722C112.995 15.0889 112.724 14.1167 112.18 13.4167C111.637 12.7556 110.822 12.4056 109.852 12.4056C108.804 12.4056 108.028 12.7555 107.446 13.4555C106.826 14.1944 106.515 15.1666 106.515 16.45ZM125.296 12.6777H121.066V22.4H118.195V12.6777H116.177V10.3444H118.195V8.67222C118.195 7.42777 118.622 6.37777 119.437 5.5611C120.251 4.74444 121.299 4.35555 122.58 4.35555C122.929 4.35555 123.239 4.39443 123.511 4.39443C123.783 4.39443 124.015 4.47221 124.209 4.54999V6.99999C124.132 6.9611 123.938 6.88333 123.705 6.80555C123.472 6.72777 123.201 6.68888 122.89 6.68888C122.308 6.68888 121.842 6.88333 121.532 7.23333C121.222 7.58333 121.066 8.16666 121.066 8.86666V10.3056H125.296V7.58333L128.129 6.72777V10.3056H131V12.6389H128.129V18.2778C128.129 19.0167 128.284 19.5222 128.517 19.8333C128.788 20.1445 129.215 20.3 129.797 20.3C129.952 20.3 130.146 20.2611 130.379 20.1833C130.612 20.1056 130.806 20.0278 130.961 19.9111V22.2445C130.767 22.3611 130.496 22.4389 130.069 22.5167C129.642 22.5945 129.254 22.6333 128.827 22.6333C127.624 22.6333 126.732 22.3222 126.15 21.7C125.568 21.0777 125.257 20.1056 125.257 18.8222L125.296 12.6777Z" fill="#90A1B9" /><path d="M13.2707 0H0V13.3H13.2707V0Z" fill="#90A1B9" /><path d="M27.9383 0H14.6676V13.3H27.9383V0Z" fill="#90A1B9" /><path d="M13.2707 14.7H0V28H13.2707V14.7Z" fill="#90A1B9" /><path d="M27.9383 14.7H14.6676V28H27.9383V14.7Z" fill="#90A1B9" /></svg>), }
    ];

    if (currentPage === 'tool') {
        return <TTSTool onBack={() => setCurrentPage('landing')} />;
    }

    return (
        <div className="min-h-screen pb-20 bg-white text-slate-900 font-sans">
            {/* Navbar */}
            <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm bg-white/80 backdrop-blur-md sticky top-0">
                <a href="#" className="flex items-center gap-2" onClick={() => setCurrentPage('landing')}>
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
                         <Mic2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">VoxStream<span className="text-indigo-600">Pro</span></span>
                </a>

                <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800 font-medium">
                    <a href="#" className="hover:text-indigo-600 transition">Home</a>
                    <a href="#features" className="hover:text-indigo-600 transition">Features</a>
                    <a href="https://whatsapp.com/channel/0029Vb7FVyy6BIEdCN9BXh1C" target="_blank" rel="noreferrer" className="hover:text-green-600 transition flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" /> Community
                    </a>
                </div>

                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage('tool')} className="hidden md:block px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white font-medium">
                        Get started
                    </button>
                    <button onClick={() => setCurrentPage('tool')} className="hidden md:block px-6 py-2 border border-slate-300 active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 font-medium" >
                        Try Demo
                    </button>
                </div>

                <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-slate-700" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                        <path d="M4 5h16M4 12h16M4 19h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                <a href="#" className="text-white font-medium" onClick={() => setMenuOpen(false)}>Home</a>
                <button className="text-white font-medium" onClick={() => { setMenuOpen(false); setCurrentPage('tool'); }}>Try Tool</button>
                <a href="https://whatsapp.com/channel/0029Vb7FVyy6BIEdCN9BXh1C" target="_blank" rel="noreferrer" className="text-white font-medium flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" /> WhatsApp Channel
                </a>
                <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md flex" >
                    X
                </button>
            </div>

            {/* Hero Section */}
            <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black overflow-hidden">
                <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

                {/* Avatars + Stars */}
                <div className="flex flex-col sm:flex-row items-center mt-24 gap-4 sm:gap-0">
                    <div className="flex -space-x-3 pr-3">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
                        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
                    </div>

                    <div>
                        <div className="flex justify-center sm:justify-start">
                            {Array(5).fill(0).map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-indigo-600" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                            ))}
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                            Trusted by 10,000+ users
                        </p>
                    </div>
                </div>

                {/* Headline + CTA */}
                <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-6 md:leading-[1.15] text-slate-900 tracking-tight">
                    Generate Lifelike Speech with <span className="bg-gradient-to-r from-indigo-700 to-indigo-600 bg-clip-text text-transparent text-nowrap">VoxStream Pro</span>
                </h1>

                <p className="max-w-2xl text-center text-base text-slate-600 my-8 leading-relaxed">
                    Access <span className="font-semibold text-indigo-600">100+ ultra-realistic neural voices</span> across <span className="font-semibold text-indigo-600">50+ languages</span>. 
                    Everything you need for professional audio content, completely <span className="font-semibold text-indigo-600">free forever</span>.
                </p>

                {/* Language Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto animate-in fade-in zoom-in duration-500 delay-100">
                    {['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Hindi', 'Portuguese', 'Italian', 'Russian', 'Arabic', 'Korean'].map(lang => (
                        <span key={lang} className="px-3 py-1.5 bg-white text-slate-600 rounded-full text-xs font-semibold border border-slate-200 shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-default">
                            {lang}
                        </span>
                    ))}
                    <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold border border-indigo-100 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> +40 More
                    </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <button onClick={() => setCurrentPage('tool')} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-9 h-12 w-full sm:w-auto flex items-center justify-center transition-colors font-medium shadow-lg shadow-indigo-600/20">
                        Get started for free
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </button>
                    <button onClick={() => setCurrentPage('tool')} className="flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 transition rounded-full px-7 h-12 w-full sm:w-auto text-slate-700 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5" aria-hidden="true"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                        <span>Try demo</span>
                    </button>
                </div>
                
                <p className="mt-8 text-sm text-slate-500">
                   Developed by <span className="font-semibold text-slate-900">Badar Bukhari</span>
                </p>

                <p className="py-6 text-slate-500 mt-14 font-medium uppercase tracking-wider text-xs">Trusted by leading brands, including</p>

                <div className="flex flex-wrap justify-between items-center max-sm:justify-center gap-8 md:gap-12 max-w-5xl w-full mx-auto py-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {companiesLogo.map((company, index) => (
                        <div key={index} className="flex items-center justify-center">
                            {company.logo}
                        </div>
                    ))}
                </div>
            </div>
            
            <section id="features" className="py-24 bg-slate-50 mt-20 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use VoxStream Pro?</h2>
                        <p className="text-slate-600 text-lg">Built for creators, developers, and businesses who need high-quality voice synthesis.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Instant & Free</h3>
                            <p className="text-slate-600 leading-relaxed">Lightning fast text-to-speech processing. Completely free to use with no hidden costs or subscriptions.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">100+ Voice Models</h3>
                            <p className="text-slate-600 leading-relaxed">Choose from over 100 neural voice models across 50+ global languages to find the perfect match for your brand.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                             <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download text-indigo-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Full Ownership</h3>
                            <p className="text-slate-600 leading-relaxed">Easily download your generated audio files in MP3 format. You own the rights to your content.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;