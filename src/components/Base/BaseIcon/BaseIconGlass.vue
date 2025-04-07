<script setup lang="ts">
const props = defineProps({
  name: String,
  active: Boolean,
})
</script>

<template>

  <svg v-if="name == 'shipping'" class="icon-glass --shipping"
       width="190" height="106" viewBox="0 0 190 106" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_702_63)">
      <foreignObject x="14.0448" y="0.269043" width="167.955" height="73.5426"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_0_702_63_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter1_ii_702_63)" data-figma-bg-blur-radius="4">
      <path d="M129.907 69.8116H28.0448C22.522 69.8116 18.0448 65.3345 18.0448 59.8116V14.269C18.0448 8.74619 22.522 4.26904 28.0448 4.26904H126.733C128.798 4.26904 130.812 4.90823 132.499 6.09884L173.766 35.2227C176.421 37.0964 178 40.1433 178 43.3929V59.8116C178 65.3345 173.523 69.8116 168 69.8116H129.907Z" fill="url(#paint0_linear_702_63)"/>
    </g>
      <foreignObject x="0" y="10.4125" width="167.955" height="73.5426"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_1_702_63_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter2_ii_702_63)" data-figma-bg-blur-radius="4">
      <path d="M115.862 79.9551H14C8.47719 79.9551 4.00005 75.478 4.00005 69.9551V24.4125C4.00005 18.8897 8.47719 14.4125 14 14.4125H112.688C114.753 14.4125 116.767 15.0517 118.454 16.2423L159.721 45.3662C162.376 47.2399 163.955 50.2868 163.955 53.5364V69.9551C163.955 75.478 159.478 79.9551 153.955 79.9551H115.862Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="14.0448" y="61.9103" width="36.0897" height="36.0897"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_2_702_63_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter3_ii_702_63)" data-figma-bg-blur-radius="4">
      <path d="M32.0896 94C39.8464 94 46.1345 87.7119 46.1345 79.9551C46.1345 72.1984 39.8464 65.9103 32.0896 65.9103C24.3329 65.9103 18.0448 72.1984 18.0448 79.9551C18.0448 87.7119 24.3329 94 32.0896 94Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="101.435" y="61.9103" width="36.0897" height="36.0897"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_3_702_63_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter4_ii_702_63)" data-figma-bg-blur-radius="4">
      <path d="M119.48 94C127.237 94 133.525 87.7119 133.525 79.9551C133.525 72.1984 127.237 65.9103 119.48 65.9103C111.723 65.9103 105.435 72.1984 105.435 79.9551C105.435 87.7119 111.723 94 119.48 94Z" fill="white" fill-opacity="0.4"/>
    </g>
    </g>
    <defs>
      <filter id="filter0_d_702_63" x="0" y="0.269043" width="190" height="105.731" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="4" dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.180392 0 0 0 0 0.764706 0 0 0 0 0.835294 0 0 0 0.4 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_702_63"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_702_63" result="shape"/>
      </filter>
      <filter id="filter1_ii_702_63" x="14.0448" y="0.269043" width="167.955" height="73.5426" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_702_63"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_702_63" result="effect2_innerShadow_702_63"/>
      </filter>
      <clipPath id="bgblur_0_702_63_clip_path" transform="translate(-14.0448 -0.269043)"><path d="M129.907 69.8116H28.0448C22.522 69.8116 18.0448 65.3345 18.0448 59.8116V14.269C18.0448 8.74619 22.522 4.26904 28.0448 4.26904H126.733C128.798 4.26904 130.812 4.90823 132.499 6.09884L173.766 35.2227C176.421 37.0964 178 40.1433 178 43.3929V59.8116C178 65.3345 173.523 69.8116 168 69.8116H129.907Z"/>
      </clipPath><filter id="filter2_ii_702_63" x="0" y="10.4125" width="167.955" height="73.5426" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_702_63"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_702_63" result="effect2_innerShadow_702_63"/>
    </filter>
      <clipPath id="bgblur_1_702_63_clip_path" transform="translate(0 -10.4125)"><path d="M115.862 79.9551H14C8.47719 79.9551 4.00005 75.478 4.00005 69.9551V24.4125C4.00005 18.8897 8.47719 14.4125 14 14.4125H112.688C114.753 14.4125 116.767 15.0517 118.454 16.2423L159.721 45.3662C162.376 47.2399 163.955 50.2868 163.955 53.5364V69.9551C163.955 75.478 159.478 79.9551 153.955 79.9551H115.862Z"/>
      </clipPath><filter id="filter3_ii_702_63" x="14.0448" y="61.9103" width="36.0897" height="36.0897" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_702_63"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_702_63" result="effect2_innerShadow_702_63"/>
    </filter>
      <clipPath id="bgblur_2_702_63_clip_path" transform="translate(-14.0448 -61.9103)"><path d="M32.0896 94C39.8464 94 46.1345 87.7119 46.1345 79.9551C46.1345 72.1984 39.8464 65.9103 32.0896 65.9103C24.3329 65.9103 18.0448 72.1984 18.0448 79.9551C18.0448 87.7119 24.3329 94 32.0896 94Z"/>
      </clipPath><filter id="filter4_ii_702_63" x="101.435" y="61.9103" width="36.0897" height="36.0897" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_702_63"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_702_63" result="effect2_innerShadow_702_63"/>
    </filter>
      <clipPath id="bgblur_3_702_63_clip_path" transform="translate(-101.435 -61.9103)"><path d="M119.48 94C127.237 94 133.525 87.7119 133.525 79.9551C133.525 72.1984 127.237 65.9103 119.48 65.9103C111.723 65.9103 105.435 72.1984 105.435 79.9551C105.435 87.7119 111.723 94 119.48 94Z"/>
      </clipPath><linearGradient id="paint0_linear_702_63" x1="98.0224" y1="69.8116" x2="98.0224" y2="4.26904" gradientUnits="userSpaceOnUse">
      <stop stop-color="#31C8D2"/>
      <stop offset="1" stop-color="#1AA6E1"/>
    </linearGradient>
    </defs>
  </svg>


  <svg v-if="name == 'group-dogs'" class="icon-glass --group-dogs"
      width="197" height="144" viewBox="0 0 197 144" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_ii_729_98)">
      <foreignObject x="75" y="5.50003" width="89.8972" height="89.8017"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_0_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter1_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M111.722 89.2403C117.132 91.8281 123.353 92.0084 128.852 89.6175C143.105 83.421 160.897 70.374 160.897 55.6586C160.897 37.719 147.174 9.50003 120.218 9.50003C93.2623 9.50003 79 39.2742 79 55.6586C79 69.0156 97.7438 82.5533 111.722 89.2403Z" fill="url(#paint0_linear_729_98)"/>
    </g>
      <foreignObject x="46.5613" y="6.10098" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_1_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter2_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M50.5613 44.1795C51.6877 33.4627 56.7082 25.5789 93.5923 10.101C103.856 14.0789 91.0796 18.5789 81.5925 37.079C78.4418 43.2229 78.3561 48.579 72.3562 56.079C66.3563 63.579 66.5612 64.1794 50.5613 44.1795Z" fill="url(#paint1_linear_729_98)"/>
    </g>
      <foreignObject x="139.334" y="6.10098" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_2_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter3_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M190.161 44.1795C189.035 33.4627 184.014 25.5789 147.13 10.101C136.866 14.0789 149.643 18.5789 159.13 37.079C162.281 43.2229 162.366 48.579 168.366 56.079C174.366 63.579 174.161 64.1794 190.161 44.1795Z" fill="url(#paint2_linear_729_98)"/>
    </g>
      <g filter="url(#filter4_ii_729_98)">
        <g filter="url(#filter5_i_729_98)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M91.5033 2.39266C91.7415 1.16406 93.0367 0.453502 94.2008 0.912847L114.696 8.99992L115.984 14.3118C116.059 14.6213 116.059 14.9442 115.984 15.2536L114.696 20.5726L93.6794 27.5446C92.4766 27.9436 91.2106 27.1375 91.0633 25.8788L90.543 21.4332C90.4787 20.8841 90.6445 20.333 91.0011 19.9105L94.3324 15.9643C94.9198 15.2684 94.963 14.2636 94.4374 13.5199L90.9348 8.56363C90.6202 8.1184 90.5009 7.56401 90.6047 7.02878L91.5033 2.39266Z" fill="url(#paint3_linear_729_98)"/>
        </g>
        <g filter="url(#filter6_i_729_98)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M147.341 2.39266C147.102 1.16406 145.807 0.453502 144.643 0.912847L124.148 8.99992L122.86 14.3118C122.785 14.6213 122.785 14.9442 122.86 15.2536L124.148 20.5726L145.164 27.5446C146.367 27.9436 147.633 27.1375 147.781 25.8788L148.301 21.4332C148.365 20.8841 148.199 20.333 147.843 19.9105L144.511 15.9643C143.924 15.2684 143.881 14.2636 144.406 13.5199L147.909 8.56363C148.224 8.1184 148.343 7.56401 148.239 7.02878L147.341 2.39266Z" fill="url(#paint4_linear_729_98)"/>
        </g>
        <g filter="url(#filter7_i_729_98)">
          <path d="M119.445 22.9413C124.891 22.9413 124.891 19.1488 124.891 14.4706C124.891 9.79244 124.891 6 119.445 6C114 6 114 9.79244 114 14.4706C114 19.1488 114 22.9413 119.445 22.9413Z" fill="url(#paint5_linear_729_98)"/>
        </g>
      </g>
    </g>
    <g filter="url(#filter8_d_729_98)">
      <foreignObject x="69" y="9.50003" width="89.8972" height="89.8017"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_3_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter9_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M105.722 93.2403C111.132 95.8281 117.353 96.0084 122.852 93.6175C137.105 87.421 154.897 74.374 154.897 59.6586C154.897 41.719 141.174 13.5 114.218 13.5C87.2623 13.5 73 43.2742 73 59.6586C73 73.0156 91.7438 86.5533 105.722 93.2403Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="117.867" y="69.2862" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_4_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter10_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M122.27 74.0918C122.492 74.0918 122.672 73.9115 122.672 73.689C122.672 73.4666 122.492 73.2862 122.27 73.2862C122.047 73.2862 121.867 73.4666 121.867 73.689C121.867 73.9115 122.047 74.0918 122.27 74.0918Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="113.839" y="71.7031" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_5_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter11_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M118.241 76.5087C118.464 76.5087 118.644 76.3284 118.644 76.1059C118.644 75.8834 118.464 75.7031 118.241 75.7031C118.019 75.7031 117.839 75.8834 117.839 76.1059C117.839 76.3284 118.019 76.5087 118.241 76.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="117.061" y="71.7031" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_6_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter12_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M121.464 76.5087C121.686 76.5087 121.867 76.3284 121.867 76.1059C121.867 75.8834 121.686 75.7031 121.464 75.7031C121.241 75.7031 121.061 75.8834 121.061 76.1059C121.061 76.3284 121.241 76.5087 121.464 76.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="113.033" y="69.2862" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_7_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter13_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M117.436 74.0918C117.658 74.0918 117.839 73.9115 117.839 73.689C117.839 73.4666 117.658 73.2862 117.436 73.2862C117.213 73.2862 117.033 73.4666 117.033 73.689C117.033 73.9115 117.213 74.0918 117.436 74.0918Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="115.45" y="70.0919" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_8_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter14_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M119.853 74.8975C120.075 74.8975 120.255 74.7171 120.255 74.4947C120.255 74.2722 120.075 74.0919 119.853 74.0919C119.63 74.0919 119.45 74.2722 119.45 74.4947C119.45 74.7171 119.63 74.8975 119.853 74.8975Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="104.243" y="58.8131" width="19.2788" height="17.3124"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_9_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter15_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M112.599 71.7689C113.41 72.2476 114.414 72.2421 115.227 71.7664C117.332 70.534 119.522 68.7827 119.522 66.8412C119.522 64.1688 118.04 62.8131 113.913 62.8131C109.787 62.8131 108.243 63.5799 108.243 66.8412C108.243 68.8012 110.736 70.6691 112.599 71.7689Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="90.2859" y="39.9994" width="11.5542" height="11.5542"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_10_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter16_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M96.063 47.5536C97.0445 47.5536 97.8401 46.758 97.8401 45.7765C97.8401 44.795 97.0445 43.9994 96.063 43.9994C95.0815 43.9994 94.2859 44.795 94.2859 45.7765C94.2859 46.758 95.0815 47.5536 96.063 47.5536Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M98.9064 53.9512C102.243 53.9512 104.949 51.246 104.949 47.909C104.949 44.572 102.243 41.8669 98.9064 41.8669C95.5694 41.8669 92.8643 44.572 92.8643 47.909C92.8643 51.246 95.5694 53.9512 98.9064 53.9512Z" fill="white" fill-opacity="0.4"/>
      <foreignObject x="121.705" y="39.9994" width="11.5542" height="11.5542"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_11_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter17_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M127.482 47.5536C128.464 47.5536 129.259 46.758 129.259 45.7765C129.259 44.795 128.464 43.9994 127.482 43.9994C126.501 43.9994 125.705 44.795 125.705 45.7765C125.705 46.758 126.501 47.5536 127.482 47.5536Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M130.326 53.9512C133.663 53.9512 136.368 51.246 136.368 47.909C136.368 44.572 133.663 41.8669 130.326 41.8669C126.989 41.8669 124.283 44.572 124.283 47.909C124.283 51.246 126.989 53.9512 130.326 53.9512Z" fill="white" fill-opacity="0.4"/>
      <foreignObject x="103.366" y="71.7031" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_12_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter18_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M107.769 76.5087C107.991 76.5087 108.171 76.3284 108.171 76.1059C108.171 75.8834 107.991 75.7031 107.769 75.7031C107.546 75.7031 107.366 75.8834 107.366 76.1059C107.366 76.3284 107.546 76.5087 107.769 76.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="106.588" y="69.2862" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_13_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter19_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M110.991 74.0918C111.213 74.0918 111.394 73.9115 111.394 73.689C111.394 73.4666 111.213 73.2862 110.991 73.2862C110.768 73.2862 110.588 73.4666 110.588 73.689C110.588 73.9115 110.768 74.0918 110.991 74.0918Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="105.782" y="71.7031" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_14_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter20_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M110.185 76.5087C110.408 76.5087 110.588 76.3284 110.588 76.1059C110.588 75.8834 110.408 75.7031 110.185 75.7031C109.963 75.7031 109.782 75.8834 109.782 76.1059C109.782 76.3284 109.963 76.5087 110.185 76.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="104.171" y="70.0919" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_15_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter21_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M108.574 74.8975C108.796 74.8975 108.977 74.7171 108.977 74.4947C108.977 74.2722 108.796 74.0919 108.574 74.0919C108.351 74.0919 108.171 74.2722 108.171 74.4947C108.171 74.7171 108.351 74.8975 108.574 74.8975Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="100.949" y="70.0919" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_16_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter22_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M105.352 74.8975C105.574 74.8975 105.754 74.7171 105.754 74.4947C105.754 74.2722 105.574 74.0919 105.352 74.0919C105.129 74.0919 104.949 74.2722 104.949 74.4947C104.949 74.7171 105.129 74.8975 105.352 74.8975Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M120.256 78.5228C120.256 80.9699 116.448 85.7419 114.001 85.7419C111.554 85.7419 108.171 80.9699 108.171 78.5228C112.199 78.9256 114.001 76.4772 114.001 72.8519C114.001 76.5087 116.227 79.3284 120.256 78.5228Z" fill="white" fill-opacity="0.6"/>
      <foreignObject x="40.5613" y="10.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_17_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter23_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M44.5613 48.1795C45.6877 37.4627 50.7082 29.5789 87.5923 14.101C97.856 18.0789 85.0796 22.5789 75.5925 41.079C72.4418 47.2229 72.3561 52.579 66.3562 60.079C60.3563 67.579 60.5612 68.1794 44.5613 48.1795Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="133.334" y="10.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_18_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter24_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M184.161 48.1795C183.035 37.4627 178.014 29.5789 141.13 14.101C130.866 18.0789 143.643 22.5789 153.13 41.079C156.281 47.2229 156.366 52.579 162.366 60.079C168.366 67.579 168.161 68.1794 184.161 48.1795Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M113.762 72.0468L113.326 74.6604C113.071 76.1933 111.956 77.4421 110.461 77.869V77.869C110.102 77.9718 109.73 78.0239 109.356 78.0239L108.682 78.0239C105.833 78.0239 103.159 76.6496 101.501 74.333L99.3093 71.2721" stroke="white" stroke-opacity="0.6"/>
      <path d="M114.271 72.093L114.707 74.7066C114.962 76.2394 116.077 77.4883 117.571 77.9152V77.9152C117.931 78.018 118.303 78.0701 118.677 78.0701L119.35 78.0701C122.199 78.0701 124.874 76.6958 126.532 74.3792L128.723 71.3183" stroke="white" stroke-opacity="0.6"/>
      <foreignObject x="80.5293" y="0.772186" width="39.0811" height="34.8752"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_19_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter25_ii_729_98)" data-figma-bg-blur-radius="4">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M85.5033 6.39266C85.7415 5.16406 87.0367 4.4535 88.2008 4.91285L108.696 12.9999L109.984 18.3118C110.059 18.6213 110.059 18.9442 109.984 19.2536L108.696 24.5726L87.6794 31.5446C86.4766 31.9436 85.2106 31.1375 85.0633 29.8788L84.543 25.4332C84.4787 24.8841 84.6445 24.333 85.0011 23.9105L88.3324 19.9643C88.9198 19.2684 88.963 18.2636 88.4374 17.5199L84.9348 12.5636C84.6202 12.1184 84.5009 11.564 84.6047 11.0288L85.5033 6.39266Z" fill="white" fill-opacity="0.6"/>
    </g>
      <foreignObject x="107.674" y="0.772186" width="38.6409" height="34.8752"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_20_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter26_ii_729_98)" data-figma-bg-blur-radius="4">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M141.341 6.39266C141.102 5.16406 139.807 4.4535 138.643 4.91285L118.148 12.9999L116.86 18.3118C116.785 18.6213 116.785 18.9442 116.86 19.2536L118.148 24.5726L139.164 31.5446C140.367 31.9436 141.633 31.1375 141.781 29.8788L142.301 25.4332C142.365 24.8841 142.199 24.333 141.843 23.9105L138.511 19.9643C137.924 19.2684 137.881 18.2636 138.406 17.5199L141.909 12.5636C142.224 12.1184 142.343 11.564 142.239 11.0288L141.341 6.39266Z" fill="white" fill-opacity="0.6"/>
    </g>
      <foreignObject x="104" y="6" width="18.8909" height="24.9413"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_21_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter27_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M113.445 26.9413C118.891 26.9413 118.891 23.1488 118.891 18.4706C118.891 13.7924 118.891 10 113.445 10C108 10 108 13.7924 108 18.4706C108 23.1488 108 26.9413 113.445 26.9413Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M80.2555 114.523C80.2555 116.97 76.4485 121.742 74.0013 121.742C71.5542 121.742 68.1711 116.97 68.1711 114.523C72.1993 114.926 74.0013 112.477 74.0013 108.852C74.0013 112.509 76.2274 115.328 80.2555 114.523Z" fill="white" fill-opacity="0.6"/>
    </g>
    <g filter="url(#filter28_ii_729_98)">
      <foreignObject x="34" y="43.5" width="89.8972" height="89.8017"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_22_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter29_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M70.7221 127.24C76.1316 129.828 82.3527 130.008 87.852 127.617C102.105 121.421 119.897 108.374 119.897 93.6585C119.897 75.719 106.174 47.5 79.2182 47.5C52.2623 47.5 38 77.2742 38 93.6585C38 107.016 56.7438 120.553 70.7221 127.24Z" fill="url(#paint6_linear_729_98)"/>
    </g>
      <foreignObject x="5.56128" y="44.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_23_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter30_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M9.56128 82.1795C10.6877 71.4627 15.7082 63.5789 52.5923 48.101C62.856 52.0789 50.0796 56.5789 40.5925 75.079C37.4418 81.2229 37.3561 86.579 31.3562 94.079C25.3563 101.579 25.5612 102.179 9.56128 82.1795Z" fill="url(#paint7_linear_729_98)"/>
    </g>
      <foreignObject x="98.334" y="44.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_24_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter31_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M149.161 82.1795C148.035 71.4627 143.014 63.5789 106.13 48.101C95.8665 52.0789 108.643 56.5789 118.13 75.079C121.281 81.2229 121.366 86.579 127.366 94.079C133.366 101.579 133.161 102.179 149.161 82.1795Z" fill="url(#paint8_linear_729_98)"/>
    </g>
    </g>
    <g filter="url(#filter32_d_729_98)">
      <foreignObject x="29" y="45.5" width="89.8972" height="89.8017"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_25_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter33_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M65.7221 129.24C71.1316 131.828 77.3527 132.008 82.852 129.618C97.1045 123.421 114.897 110.374 114.897 95.6586C114.897 77.719 101.174 49.5 74.2182 49.5C47.2623 49.5 33 79.2742 33 95.6586C33 109.016 51.7438 122.553 65.7221 129.24Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="77.8667" y="105.286" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_26_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter34_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M82.2695 110.092C82.492 110.092 82.6723 109.912 82.6723 109.689C82.6723 109.467 82.492 109.286 82.2695 109.286C82.047 109.286 81.8667 109.467 81.8667 109.689C81.8667 109.912 82.047 110.092 82.2695 110.092Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="73.8386" y="107.703" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_27_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter35_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M78.2414 112.509C78.4639 112.509 78.6442 112.328 78.6442 112.106C78.6442 111.883 78.4639 111.703 78.2414 111.703C78.019 111.703 77.8386 111.883 77.8386 112.106C77.8386 112.328 78.019 112.509 78.2414 112.509Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="77.061" y="107.703" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_28_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter36_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M81.4638 112.509C81.6863 112.509 81.8667 112.328 81.8667 112.106C81.8667 111.883 81.6863 111.703 81.4638 111.703C81.2414 111.703 81.061 111.883 81.061 112.106C81.061 112.328 81.2414 112.509 81.4638 112.509Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="73.033" y="105.286" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_29_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter37_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M77.4358 110.092C77.6582 110.092 77.8386 109.912 77.8386 109.689C77.8386 109.467 77.6582 109.286 77.4358 109.286C77.2133 109.286 77.033 109.467 77.033 109.689C77.033 109.912 77.2133 110.092 77.4358 110.092Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="75.4497" y="106.092" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_30_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter38_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M79.8525 110.897C80.075 110.897 80.2553 110.717 80.2553 110.495C80.2553 110.272 80.075 110.092 79.8525 110.092C79.6301 110.092 79.4497 110.272 79.4497 110.495C79.4497 110.717 79.6301 110.897 79.8525 110.897Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="64.2429" y="94.8131" width="19.2788" height="17.3124"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_31_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter39_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M72.5993 107.769C73.4103 108.248 74.4139 108.242 75.2267 107.766C77.3323 106.534 79.5217 104.783 79.5217 102.841C79.5217 100.169 78.0404 98.8131 73.9134 98.8131C69.7865 98.8131 68.2429 99.5799 68.2429 102.841C68.2429 104.801 70.7361 106.669 72.5993 107.769Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="50.2859" y="75.9994" width="11.5542" height="11.5542"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_32_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter40_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M56.063 83.5536C57.0445 83.5536 57.8401 82.758 57.8401 81.7765C57.8401 80.795 57.0445 79.9994 56.063 79.9994C55.0815 79.9994 54.2859 80.795 54.2859 81.7765C54.2859 82.758 55.0815 83.5536 56.063 83.5536Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M58.9064 89.9512C62.2434 89.9512 64.9486 87.246 64.9486 83.909C64.9486 80.572 62.2434 77.8669 58.9064 77.8669C55.5694 77.8669 52.8643 80.572 52.8643 83.909C52.8643 87.246 55.5694 89.9512 58.9064 89.9512Z" fill="white" fill-opacity="0.4"/>
      <foreignObject x="81.7053" y="75.9994" width="11.5542" height="11.5542"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_33_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter41_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M87.4824 83.5536C88.4639 83.5536 89.2595 82.758 89.2595 81.7765C89.2595 80.795 88.4639 79.9994 87.4824 79.9994C86.501 79.9994 85.7053 80.795 85.7053 81.7765C85.7053 82.758 86.501 83.5536 87.4824 83.5536Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M90.3259 89.9512C93.6629 89.9512 96.3681 87.246 96.3681 83.909C96.3681 80.572 93.6629 77.8669 90.3259 77.8669C86.9889 77.8669 84.2837 80.572 84.2837 83.909C84.2837 87.246 86.9889 89.9512 90.3259 89.9512Z" fill="white" fill-opacity="0.4"/>
      <foreignObject x="63.3657" y="107.703" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_34_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter42_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M67.7685 112.509C67.991 112.509 68.1713 112.328 68.1713 112.106C68.1713 111.883 67.991 111.703 67.7685 111.703C67.5461 111.703 67.3657 111.883 67.3657 112.106C67.3657 112.328 67.5461 112.509 67.7685 112.509Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="66.5881" y="105.286" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_35_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter43_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M70.9909 110.092C71.2134 110.092 71.3938 109.912 71.3938 109.689C71.3938 109.467 71.2134 109.286 70.9909 109.286C70.7685 109.286 70.5881 109.467 70.5881 109.689C70.5881 109.912 70.7685 110.092 70.9909 110.092Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="65.7825" y="107.703" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_36_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter44_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M70.1853 112.509C70.4078 112.509 70.5881 112.328 70.5881 112.106C70.5881 111.883 70.4078 111.703 70.1853 111.703C69.9628 111.703 69.7825 111.883 69.7825 112.106C69.7825 112.328 69.9628 112.509 70.1853 112.509Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="64.1711" y="106.092" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_37_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter45_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M68.574 110.897C68.7964 110.897 68.9768 110.717 68.9768 110.495C68.9768 110.272 68.7964 110.092 68.574 110.092C68.3515 110.092 68.1711 110.272 68.1711 110.495C68.1711 110.717 68.3515 110.897 68.574 110.897Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="60.9487" y="106.092" width="8.80566" height="8.80563"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_38_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter46_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M65.3515 110.897C65.574 110.897 65.7544 110.717 65.7544 110.495C65.7544 110.272 65.574 110.092 65.3515 110.092C65.1291 110.092 64.9487 110.272 64.9487 110.495C64.9487 110.717 65.1291 110.897 65.3515 110.897Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="0.561279" y="46.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_39_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter47_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M4.56128 84.1795C5.68766 73.4627 10.7082 65.5789 47.5923 50.101C57.856 54.0789 45.0796 58.5789 35.5925 77.079C32.4418 83.2229 32.3561 88.579 26.3562 96.079C20.3563 103.579 20.5612 104.179 4.56128 84.1795Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="93.334" y="46.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_40_729_98_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter48_ii_729_98)" data-figma-bg-blur-radius="4">
      <path d="M144.161 84.1795C143.035 73.4627 138.014 65.5789 101.13 50.101C90.8665 54.0789 103.643 58.5789 113.13 77.079C116.281 83.2229 116.366 88.579 122.366 96.079C128.366 103.579 128.161 104.179 144.161 84.1795Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M73.7617 108.047L73.3261 110.66C73.0706 112.193 71.9556 113.442 70.4614 113.869V113.869C70.1018 113.972 69.7296 114.024 69.3556 114.024L68.6823 114.024C65.8333 114.024 63.1591 112.65 61.5007 110.333L59.3093 107.272" stroke="white" stroke-opacity="0.6"/>
      <path d="M74.271 108.093L74.7066 110.707C74.9621 112.239 76.0771 113.488 77.5713 113.915V113.915C77.9309 114.018 78.3031 114.07 78.6771 114.07L79.3504 114.07C82.1995 114.07 84.8736 112.696 86.5321 110.379L88.7234 107.318" stroke="white" stroke-opacity="0.6"/>
      <path d="M80.2543 114.449C80.2543 116.896 76.4472 121.668 74.0001 121.668C71.553 121.668 68.1699 116.896 68.1699 114.449C72.198 114.852 74.0001 112.403 74.0001 108.778C74.0001 112.435 76.2262 115.255 80.2543 114.449Z" fill="white" fill-opacity="0.6"/>
    </g>
    <path d="M78 114.5C78 116.209 75.852 119.04 73.827 119.04C71.802 119.04 70 116.209 70 114.5C73.5 113.5 73 112.5 74 110C75 112.5 75 114 78 114.5Z" fill="white" fill-opacity="0.6"/>
    <defs>
      <filter id="filter0_ii_729_98" x="46.5613" y="-3.22781" width="147.6" height="98.5296" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
      </filter>
      <filter id="filter1_ii_729_98" x="75" y="5.50003" width="89.8972" height="89.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
      </filter>
      <clipPath id="bgblur_0_729_98_clip_path" transform="translate(-75 -5.50003)"><path d="M111.722 89.2403C117.132 91.8281 123.353 92.0084 128.852 89.6175C143.105 83.421 160.897 70.374 160.897 55.6586C160.897 37.719 147.174 9.50003 120.218 9.50003C93.2623 9.50003 79 39.2742 79 55.6586C79 69.0156 97.7438 82.5533 111.722 89.2403Z"/>
      </clipPath><filter id="filter2_ii_729_98" x="46.5613" y="6.10098" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_1_729_98_clip_path" transform="translate(-46.5613 -6.10098)"><path d="M50.5613 44.1795C51.6877 33.4627 56.7082 25.5789 93.5923 10.101C103.856 14.0789 91.0796 18.5789 81.5925 37.079C78.4418 43.2229 78.3561 48.579 72.3562 56.079C66.3563 63.579 66.5612 64.1794 50.5613 44.1795Z"/>
      </clipPath><filter id="filter3_ii_729_98" x="139.334" y="6.10098" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_2_729_98_clip_path" transform="translate(-139.334 -6.10098)"><path d="M190.161 44.1795C189.035 33.4627 184.014 25.5789 147.13 10.101C136.866 14.0789 149.643 18.5789 159.13 37.079C162.281 43.2229 162.366 48.579 168.366 56.079C174.366 63.579 174.161 64.1794 190.161 44.1795Z"/>
      </clipPath><filter id="filter4_ii_729_98" x="86.5293" y="-3.22781" width="65.7852" height="34.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <filter id="filter5_i_729_98" x="90.5293" y="0.772186" width="31.0811" height="26.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      </filter>
      <filter id="filter6_i_729_98" x="117.674" y="0.772186" width="30.6409" height="26.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      </filter>
      <filter id="filter7_i_729_98" x="114" y="6" width="10.8909" height="16.9413" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      </filter>
      <filter id="filter8_d_729_98" x="40.5613" y="0.772186" width="155.6" height="132.97" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="4" dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.545098 0 0 0 0 0.823529 0 0 0 0 0.192157 0 0 0 0.4 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_729_98"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_729_98" result="shape"/>
      </filter>
      <filter id="filter9_ii_729_98" x="69" y="9.50003" width="89.8972" height="89.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
      </filter>
      <clipPath id="bgblur_3_729_98_clip_path" transform="translate(-69 -9.50003)"><path d="M105.722 93.2403C111.132 95.8281 117.353 96.0084 122.852 93.6175C137.105 87.421 154.897 74.374 154.897 59.6586C154.897 41.719 141.174 13.5 114.218 13.5C87.2623 13.5 73 43.2742 73 59.6586C73 73.0156 91.7438 86.5533 105.722 93.2403Z"/>
      </clipPath><filter id="filter10_ii_729_98" x="117.867" y="69.2862" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_4_729_98_clip_path" transform="translate(-117.867 -69.2862)"><path d="M122.27 74.0918C122.492 74.0918 122.672 73.9115 122.672 73.689C122.672 73.4666 122.492 73.2862 122.27 73.2862C122.047 73.2862 121.867 73.4666 121.867 73.689C121.867 73.9115 122.047 74.0918 122.27 74.0918Z"/>
      </clipPath><filter id="filter11_ii_729_98" x="113.839" y="71.7031" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_5_729_98_clip_path" transform="translate(-113.839 -71.7031)"><path d="M118.241 76.5087C118.464 76.5087 118.644 76.3284 118.644 76.1059C118.644 75.8834 118.464 75.7031 118.241 75.7031C118.019 75.7031 117.839 75.8834 117.839 76.1059C117.839 76.3284 118.019 76.5087 118.241 76.5087Z"/>
      </clipPath><filter id="filter12_ii_729_98" x="117.061" y="71.7031" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_6_729_98_clip_path" transform="translate(-117.061 -71.7031)"><path d="M121.464 76.5087C121.686 76.5087 121.867 76.3284 121.867 76.1059C121.867 75.8834 121.686 75.7031 121.464 75.7031C121.241 75.7031 121.061 75.8834 121.061 76.1059C121.061 76.3284 121.241 76.5087 121.464 76.5087Z"/>
      </clipPath><filter id="filter13_ii_729_98" x="113.033" y="69.2862" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_7_729_98_clip_path" transform="translate(-113.033 -69.2862)"><path d="M117.436 74.0918C117.658 74.0918 117.839 73.9115 117.839 73.689C117.839 73.4666 117.658 73.2862 117.436 73.2862C117.213 73.2862 117.033 73.4666 117.033 73.689C117.033 73.9115 117.213 74.0918 117.436 74.0918Z"/>
      </clipPath><filter id="filter14_ii_729_98" x="115.45" y="70.0919" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_8_729_98_clip_path" transform="translate(-115.45 -70.0919)"><path d="M119.853 74.8975C120.075 74.8975 120.255 74.7171 120.255 74.4947C120.255 74.2722 120.075 74.0919 119.853 74.0919C119.63 74.0919 119.45 74.2722 119.45 74.4947C119.45 74.7171 119.63 74.8975 119.853 74.8975Z"/>
      </clipPath><filter id="filter15_ii_729_98" x="104.243" y="58.8131" width="19.2788" height="17.3124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_9_729_98_clip_path" transform="translate(-104.243 -58.8131)"><path d="M112.599 71.7689C113.41 72.2476 114.414 72.2421 115.227 71.7664C117.332 70.534 119.522 68.7827 119.522 66.8412C119.522 64.1688 118.04 62.8131 113.913 62.8131C109.787 62.8131 108.243 63.5799 108.243 66.8412C108.243 68.8012 110.736 70.6691 112.599 71.7689Z"/>
      </clipPath><filter id="filter16_ii_729_98" x="90.2859" y="39.9994" width="11.5542" height="11.5542" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_10_729_98_clip_path" transform="translate(-90.2859 -39.9994)"><path d="M96.063 47.5536C97.0445 47.5536 97.8401 46.758 97.8401 45.7765C97.8401 44.795 97.0445 43.9994 96.063 43.9994C95.0815 43.9994 94.2859 44.795 94.2859 45.7765C94.2859 46.758 95.0815 47.5536 96.063 47.5536Z"/>
      </clipPath><filter id="filter17_ii_729_98" x="121.705" y="39.9994" width="11.5542" height="11.5542" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_11_729_98_clip_path" transform="translate(-121.705 -39.9994)"><path d="M127.482 47.5536C128.464 47.5536 129.259 46.758 129.259 45.7765C129.259 44.795 128.464 43.9994 127.482 43.9994C126.501 43.9994 125.705 44.795 125.705 45.7765C125.705 46.758 126.501 47.5536 127.482 47.5536Z"/>
      </clipPath><filter id="filter18_ii_729_98" x="103.366" y="71.7031" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_12_729_98_clip_path" transform="translate(-103.366 -71.7031)"><path d="M107.769 76.5087C107.991 76.5087 108.171 76.3284 108.171 76.1059C108.171 75.8834 107.991 75.7031 107.769 75.7031C107.546 75.7031 107.366 75.8834 107.366 76.1059C107.366 76.3284 107.546 76.5087 107.769 76.5087Z"/>
      </clipPath><filter id="filter19_ii_729_98" x="106.588" y="69.2862" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_13_729_98_clip_path" transform="translate(-106.588 -69.2862)"><path d="M110.991 74.0918C111.213 74.0918 111.394 73.9115 111.394 73.689C111.394 73.4666 111.213 73.2862 110.991 73.2862C110.768 73.2862 110.588 73.4666 110.588 73.689C110.588 73.9115 110.768 74.0918 110.991 74.0918Z"/>
      </clipPath><filter id="filter20_ii_729_98" x="105.782" y="71.7031" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_14_729_98_clip_path" transform="translate(-105.782 -71.7031)"><path d="M110.185 76.5087C110.408 76.5087 110.588 76.3284 110.588 76.1059C110.588 75.8834 110.408 75.7031 110.185 75.7031C109.963 75.7031 109.782 75.8834 109.782 76.1059C109.782 76.3284 109.963 76.5087 110.185 76.5087Z"/>
      </clipPath><filter id="filter21_ii_729_98" x="104.171" y="70.0919" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_15_729_98_clip_path" transform="translate(-104.171 -70.0919)"><path d="M108.574 74.8975C108.796 74.8975 108.977 74.7171 108.977 74.4947C108.977 74.2722 108.796 74.0919 108.574 74.0919C108.351 74.0919 108.171 74.2722 108.171 74.4947C108.171 74.7171 108.351 74.8975 108.574 74.8975Z"/>
      </clipPath><filter id="filter22_ii_729_98" x="100.949" y="70.0919" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_16_729_98_clip_path" transform="translate(-100.949 -70.0919)"><path d="M105.352 74.8975C105.574 74.8975 105.754 74.7171 105.754 74.4947C105.754 74.2722 105.574 74.0919 105.352 74.0919C105.129 74.0919 104.949 74.2722 104.949 74.4947C104.949 74.7171 105.129 74.8975 105.352 74.8975Z"/>
      </clipPath><filter id="filter23_ii_729_98" x="40.5613" y="10.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_17_729_98_clip_path" transform="translate(-40.5613 -10.101)"><path d="M44.5613 48.1795C45.6877 37.4627 50.7082 29.5789 87.5923 14.101C97.856 18.0789 85.0796 22.5789 75.5925 41.079C72.4418 47.2229 72.3561 52.579 66.3562 60.079C60.3563 67.579 60.5612 68.1794 44.5613 48.1795Z"/>
      </clipPath><filter id="filter24_ii_729_98" x="133.334" y="10.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_18_729_98_clip_path" transform="translate(-133.334 -10.101)"><path d="M184.161 48.1795C183.035 37.4627 178.014 29.5789 141.13 14.101C130.866 18.0789 143.643 22.5789 153.13 41.079C156.281 47.2229 156.366 52.579 162.366 60.079C168.366 67.579 168.161 68.1794 184.161 48.1795Z"/>
      </clipPath><filter id="filter25_ii_729_98" x="80.5293" y="0.772186" width="39.0811" height="34.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_19_729_98_clip_path" transform="translate(-80.5293 -0.772186)"><path fill-rule="evenodd" clip-rule="evenodd" d="M85.5033 6.39266C85.7415 5.16406 87.0367 4.4535 88.2008 4.91285L108.696 12.9999L109.984 18.3118C110.059 18.6213 110.059 18.9442 109.984 19.2536L108.696 24.5726L87.6794 31.5446C86.4766 31.9436 85.2106 31.1375 85.0633 29.8788L84.543 25.4332C84.4787 24.8841 84.6445 24.333 85.0011 23.9105L88.3324 19.9643C88.9198 19.2684 88.963 18.2636 88.4374 17.5199L84.9348 12.5636C84.6202 12.1184 84.5009 11.564 84.6047 11.0288L85.5033 6.39266Z"/>
      </clipPath><filter id="filter26_ii_729_98" x="107.674" y="0.772186" width="38.6409" height="34.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_20_729_98_clip_path" transform="translate(-107.674 -0.772186)"><path fill-rule="evenodd" clip-rule="evenodd" d="M141.341 6.39266C141.102 5.16406 139.807 4.4535 138.643 4.91285L118.148 12.9999L116.86 18.3118C116.785 18.6213 116.785 18.9442 116.86 19.2536L118.148 24.5726L139.164 31.5446C140.367 31.9436 141.633 31.1375 141.781 29.8788L142.301 25.4332C142.365 24.8841 142.199 24.333 141.843 23.9105L138.511 19.9643C137.924 19.2684 137.881 18.2636 138.406 17.5199L141.909 12.5636C142.224 12.1184 142.343 11.564 142.239 11.0288L141.341 6.39266Z"/>
      </clipPath><filter id="filter27_ii_729_98" x="104" y="6" width="18.8909" height="24.9413" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_21_729_98_clip_path" transform="translate(-104 -6)"><path d="M113.445 26.9413C118.891 26.9413 118.891 23.1488 118.891 18.4706C118.891 13.7924 118.891 10 113.445 10C108 10 108 13.7924 108 18.4706C108 23.1488 108 26.9413 113.445 26.9413Z"/>
      </clipPath><filter id="filter28_ii_729_98" x="5.56128" y="43.5" width="147.6" height="89.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <filter id="filter29_ii_729_98" x="34" y="43.5" width="89.8972" height="89.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
      </filter>
      <clipPath id="bgblur_22_729_98_clip_path" transform="translate(-34 -43.5)"><path d="M70.7221 127.24C76.1316 129.828 82.3527 130.008 87.852 127.617C102.105 121.421 119.897 108.374 119.897 93.6585C119.897 75.719 106.174 47.5 79.2182 47.5C52.2623 47.5 38 77.2742 38 93.6585C38 107.016 56.7438 120.553 70.7221 127.24Z"/>
      </clipPath><filter id="filter30_ii_729_98" x="5.56128" y="44.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_23_729_98_clip_path" transform="translate(-5.56128 -44.101)"><path d="M9.56128 82.1795C10.6877 71.4627 15.7082 63.5789 52.5923 48.101C62.856 52.0789 50.0796 56.5789 40.5925 75.079C37.4418 81.2229 37.3561 86.579 31.3562 94.079C25.3563 101.579 25.5612 102.179 9.56128 82.1795Z"/>
      </clipPath><filter id="filter31_ii_729_98" x="98.334" y="44.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_24_729_98_clip_path" transform="translate(-98.334 -44.101)"><path d="M149.161 82.1795C148.035 71.4627 143.014 63.5789 106.13 48.101C95.8665 52.0789 108.643 56.5789 118.13 75.079C121.281 81.2229 121.366 86.579 127.366 94.079C133.366 101.579 133.161 102.179 149.161 82.1795Z"/>
      </clipPath><filter id="filter32_d_729_98" x="0.561279" y="45.5" width="155.6" height="97.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="4" dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.545098 0 0 0 0 0.823529 0 0 0 0 0.192157 0 0 0 0.4 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_729_98"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_729_98" result="shape"/>
    </filter>
      <filter id="filter33_ii_729_98" x="29" y="45.5" width="89.8972" height="89.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
      </filter>
      <clipPath id="bgblur_25_729_98_clip_path" transform="translate(-29 -45.5)"><path d="M65.7221 129.24C71.1316 131.828 77.3527 132.008 82.852 129.618C97.1045 123.421 114.897 110.374 114.897 95.6586C114.897 77.719 101.174 49.5 74.2182 49.5C47.2623 49.5 33 79.2742 33 95.6586C33 109.016 51.7438 122.553 65.7221 129.24Z"/>
      </clipPath><filter id="filter34_ii_729_98" x="77.8667" y="105.286" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_26_729_98_clip_path" transform="translate(-77.8667 -105.286)"><path d="M82.2695 110.092C82.492 110.092 82.6723 109.912 82.6723 109.689C82.6723 109.467 82.492 109.286 82.2695 109.286C82.047 109.286 81.8667 109.467 81.8667 109.689C81.8667 109.912 82.047 110.092 82.2695 110.092Z"/>
      </clipPath><filter id="filter35_ii_729_98" x="73.8386" y="107.703" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_27_729_98_clip_path" transform="translate(-73.8386 -107.703)"><path d="M78.2414 112.509C78.4639 112.509 78.6442 112.328 78.6442 112.106C78.6442 111.883 78.4639 111.703 78.2414 111.703C78.019 111.703 77.8386 111.883 77.8386 112.106C77.8386 112.328 78.019 112.509 78.2414 112.509Z"/>
      </clipPath><filter id="filter36_ii_729_98" x="77.061" y="107.703" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_28_729_98_clip_path" transform="translate(-77.061 -107.703)"><path d="M81.4638 112.509C81.6863 112.509 81.8667 112.328 81.8667 112.106C81.8667 111.883 81.6863 111.703 81.4638 111.703C81.2414 111.703 81.061 111.883 81.061 112.106C81.061 112.328 81.2414 112.509 81.4638 112.509Z"/>
      </clipPath><filter id="filter37_ii_729_98" x="73.033" y="105.286" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_29_729_98_clip_path" transform="translate(-73.033 -105.286)"><path d="M77.4358 110.092C77.6582 110.092 77.8386 109.912 77.8386 109.689C77.8386 109.467 77.6582 109.286 77.4358 109.286C77.2133 109.286 77.033 109.467 77.033 109.689C77.033 109.912 77.2133 110.092 77.4358 110.092Z"/>
      </clipPath><filter id="filter38_ii_729_98" x="75.4497" y="106.092" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_30_729_98_clip_path" transform="translate(-75.4497 -106.092)"><path d="M79.8525 110.897C80.075 110.897 80.2553 110.717 80.2553 110.495C80.2553 110.272 80.075 110.092 79.8525 110.092C79.6301 110.092 79.4497 110.272 79.4497 110.495C79.4497 110.717 79.6301 110.897 79.8525 110.897Z"/>
      </clipPath><filter id="filter39_ii_729_98" x="64.2429" y="94.8131" width="19.2788" height="17.3124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_31_729_98_clip_path" transform="translate(-64.2429 -94.8131)"><path d="M72.5993 107.769C73.4103 108.248 74.4139 108.242 75.2267 107.766C77.3323 106.534 79.5217 104.783 79.5217 102.841C79.5217 100.169 78.0404 98.8131 73.9134 98.8131C69.7865 98.8131 68.2429 99.5799 68.2429 102.841C68.2429 104.801 70.7361 106.669 72.5993 107.769Z"/>
      </clipPath><filter id="filter40_ii_729_98" x="50.2859" y="75.9994" width="11.5542" height="11.5542" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_32_729_98_clip_path" transform="translate(-50.2859 -75.9994)"><path d="M56.063 83.5536C57.0445 83.5536 57.8401 82.758 57.8401 81.7765C57.8401 80.795 57.0445 79.9994 56.063 79.9994C55.0815 79.9994 54.2859 80.795 54.2859 81.7765C54.2859 82.758 55.0815 83.5536 56.063 83.5536Z"/>
      </clipPath><filter id="filter41_ii_729_98" x="81.7053" y="75.9994" width="11.5542" height="11.5542" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_33_729_98_clip_path" transform="translate(-81.7053 -75.9994)"><path d="M87.4824 83.5536C88.4639 83.5536 89.2595 82.758 89.2595 81.7765C89.2595 80.795 88.4639 79.9994 87.4824 79.9994C86.501 79.9994 85.7053 80.795 85.7053 81.7765C85.7053 82.758 86.501 83.5536 87.4824 83.5536Z"/>
      </clipPath><filter id="filter42_ii_729_98" x="63.3657" y="107.703" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_34_729_98_clip_path" transform="translate(-63.3657 -107.703)"><path d="M67.7685 112.509C67.991 112.509 68.1713 112.328 68.1713 112.106C68.1713 111.883 67.991 111.703 67.7685 111.703C67.5461 111.703 67.3657 111.883 67.3657 112.106C67.3657 112.328 67.5461 112.509 67.7685 112.509Z"/>
      </clipPath><filter id="filter43_ii_729_98" x="66.5881" y="105.286" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_35_729_98_clip_path" transform="translate(-66.5881 -105.286)"><path d="M70.9909 110.092C71.2134 110.092 71.3938 109.912 71.3938 109.689C71.3938 109.467 71.2134 109.286 70.9909 109.286C70.7685 109.286 70.5881 109.467 70.5881 109.689C70.5881 109.912 70.7685 110.092 70.9909 110.092Z"/>
      </clipPath><filter id="filter44_ii_729_98" x="65.7825" y="107.703" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_36_729_98_clip_path" transform="translate(-65.7825 -107.703)"><path d="M70.1853 112.509C70.4078 112.509 70.5881 112.328 70.5881 112.106C70.5881 111.883 70.4078 111.703 70.1853 111.703C69.9628 111.703 69.7825 111.883 69.7825 112.106C69.7825 112.328 69.9628 112.509 70.1853 112.509Z"/>
      </clipPath><filter id="filter45_ii_729_98" x="64.1711" y="106.092" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_37_729_98_clip_path" transform="translate(-64.1711 -106.092)"><path d="M68.574 110.897C68.7964 110.897 68.9768 110.717 68.9768 110.495C68.9768 110.272 68.7964 110.092 68.574 110.092C68.3515 110.092 68.1711 110.272 68.1711 110.495C68.1711 110.717 68.3515 110.897 68.574 110.897Z"/>
      </clipPath><filter id="filter46_ii_729_98" x="60.9487" y="106.092" width="8.80566" height="8.80563" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_38_729_98_clip_path" transform="translate(-60.9487 -106.092)"><path d="M65.3515 110.897C65.574 110.897 65.7544 110.717 65.7544 110.495C65.7544 110.272 65.574 110.092 65.3515 110.092C65.1291 110.092 64.9487 110.272 64.9487 110.495C64.9487 110.717 65.1291 110.897 65.3515 110.897Z"/>
      </clipPath><filter id="filter47_ii_729_98" x="0.561279" y="46.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_39_729_98_clip_path" transform="translate(-0.561279 -46.101)"><path d="M4.56128 84.1795C5.68766 73.4627 10.7082 65.5789 47.5923 50.101C57.856 54.0789 45.0796 58.5789 35.5925 77.079C32.4418 83.2229 32.3561 88.579 26.3562 96.079C20.3563 103.579 20.5612 104.179 4.56128 84.1795Z"/>
      </clipPath><filter id="filter48_ii_729_98" x="93.334" y="46.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_729_98"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_729_98" result="effect2_innerShadow_729_98"/>
    </filter>
      <clipPath id="bgblur_40_729_98_clip_path" transform="translate(-93.334 -46.101)"><path d="M144.161 84.1795C143.035 73.4627 138.014 65.5789 101.13 50.101C90.8665 54.0789 103.643 58.5789 113.13 77.079C116.281 83.2229 116.366 88.579 122.366 96.079C128.366 103.579 128.161 104.179 144.161 84.1795Z"/>
      </clipPath><linearGradient id="paint0_linear_729_98" x1="119.949" y1="9.50003" x2="119.949" y2="92.6493" gradientUnits="userSpaceOnUse">
      <stop stop-color="#93DF32"/>
      <stop offset="1" stop-color="#70BD0D"/>
    </linearGradient>
      <linearGradient id="paint1_linear_729_98" x1="94.9353" y1="37.0524" x2="51.787" y2="32.5173" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
      <linearGradient id="paint2_linear_729_98" x1="145.787" y1="37.0524" x2="188.935" y2="32.5173" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
      <linearGradient id="paint3_linear_729_98" x1="123.15" y1="14.8556" x2="90.3063" y2="14.1443" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
      <linearGradient id="paint4_linear_729_98" x1="116.306" y1="14.8424" x2="148.537" y2="14.1443" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
      <linearGradient id="paint5_linear_729_98" x1="119.445" y1="6" x2="119.445" y2="22.9413" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
      <linearGradient id="paint6_linear_729_98" x1="78.9487" y1="47.5" x2="78.9487" y2="130.649" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
      <linearGradient id="paint7_linear_729_98" x1="53.9353" y1="75.0524" x2="10.787" y2="70.5173" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
      <linearGradient id="paint8_linear_729_98" x1="104.787" y1="75.0524" x2="147.935" y2="70.5173" gradientUnits="userSpaceOnUse">
        <stop stop-color="#93DF32"/>
        <stop offset="1" stop-color="#70BD0D"/>
      </linearGradient>
    </defs>
  </svg>


  <svg v-if="name == 'dog-boy'" class="icon-glass --group-dogs" width="163" height="112" viewBox="0 0 163 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_704_12)">
      <g filter="url(#filter1_i_704_12)">
        <foreignObject x="35" y="9.50002" width="89.8972" height="89.8017"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_0_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter2_ii_704_12)" data-figma-bg-blur-radius="4">
        <path d="M71.7221 93.2403C77.1316 95.8281 83.3527 96.0084 88.852 93.6175C103.105 87.421 120.897 74.374 120.897 59.6585C120.897 41.719 107.174 13.5 80.2182 13.5C53.2623 13.5 39 43.2742 39 59.6585C39 73.0156 57.7438 86.5533 71.7221 93.2403Z" fill="url(#paint0_linear_704_12)"/>
      </g>
        <foreignObject x="6.56128" y="10.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_1_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter3_ii_704_12)" data-figma-bg-blur-radius="4">
        <path d="M10.5613 48.1795C11.6877 37.4627 16.7082 29.5789 53.5923 14.101C63.856 18.0789 51.0796 22.5789 41.5925 41.079C38.4418 47.2229 38.3561 52.579 32.3562 60.079C26.3563 67.579 26.5612 68.1794 10.5613 48.1795Z" fill="url(#paint1_linear_704_12)"/>
      </g>
        <foreignObject x="99.334" y="10.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_2_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter4_ii_704_12)" data-figma-bg-blur-radius="4">
        <path d="M150.161 48.1795C149.035 37.4627 144.014 29.5789 107.13 14.101C96.8665 18.0789 109.643 22.5789 119.13 41.079C122.281 47.2229 122.366 52.579 128.366 60.079C134.366 67.579 134.161 68.1794 150.161 48.1795Z" fill="url(#paint2_linear_704_12)"/>
      </g>
        <g filter="url(#filter5_ii_704_12)">
          <g filter="url(#filter6_i_704_12)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5033 6.39267C51.7415 5.16406 53.0367 4.45351 54.2008 4.91285L74.6961 12.9999L75.9837 18.3118C76.0588 18.6213 76.0588 18.9442 75.9839 19.2536L74.6961 24.5726L53.6794 31.5446C52.4766 31.9436 51.2106 31.1375 51.0633 29.8788L50.543 25.4332C50.4787 24.8841 50.6445 24.333 51.0011 23.9106L54.3324 19.9643C54.9198 19.2684 54.963 18.2636 54.4374 17.5199L50.9348 12.5636C50.6202 12.1184 50.5009 11.564 50.6047 11.0288L51.5033 6.39267Z" fill="url(#paint3_linear_704_12)"/>
          </g>
          <g filter="url(#filter7_i_704_12)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M107.341 6.39266C107.102 5.16406 105.807 4.4535 104.643 4.91285L84.1477 12.9999L82.8601 18.3118C82.7851 18.6213 82.785 18.9442 82.86 19.2536L84.1477 24.5726L105.164 31.5446C106.367 31.9436 107.633 31.1375 107.781 29.8788L108.301 25.4332C108.365 24.8841 108.199 24.333 107.843 23.9105L104.511 19.9643C103.924 19.2684 103.881 18.2636 104.406 17.5199L107.909 12.5636C108.224 12.1184 108.343 11.564 108.239 11.0288L107.341 6.39266Z" fill="url(#paint4_linear_704_12)"/>
          </g>
          <g filter="url(#filter8_i_704_12)">
            <path d="M79.4454 26.9413C84.8908 26.9413 84.8908 23.1489 84.8908 18.4706C84.8908 13.7924 84.8908 10 79.4454 10C74 10 74 13.7924 74 18.4706C74 23.1489 74 26.9413 79.4454 26.9413Z" fill="url(#paint5_linear_704_12)"/>
          </g>
        </g>
      </g>
      <foreignObject x="29" y="13.5" width="89.8972" height="89.8017"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_3_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter9_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M65.7221 97.2403C71.1316 99.8281 77.3527 100.008 82.852 97.6175C97.1045 91.421 114.897 78.374 114.897 63.6585C114.897 45.719 101.174 17.5 74.2182 17.5C47.2623 17.5 33 47.2742 33 63.6585C33 77.0156 51.7438 90.5533 65.7221 97.2403Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="77.8667" y="73.2862" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_4_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter10_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M82.2695 78.0918C82.492 78.0918 82.6723 77.9115 82.6723 77.689C82.6723 77.4666 82.492 77.2862 82.2695 77.2862C82.047 77.2862 81.8667 77.4666 81.8667 77.689C81.8667 77.9115 82.047 78.0918 82.2695 78.0918Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="73.8386" y="75.7031" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_5_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter11_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M78.2414 80.5087C78.4639 80.5087 78.6442 80.3284 78.6442 80.1059C78.6442 79.8834 78.4639 79.7031 78.2414 79.7031C78.019 79.7031 77.8386 79.8834 77.8386 80.1059C77.8386 80.3284 78.019 80.5087 78.2414 80.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="77.061" y="75.7031" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_6_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter12_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M81.4638 80.5087C81.6863 80.5087 81.8667 80.3284 81.8667 80.1059C81.8667 79.8834 81.6863 79.7031 81.4638 79.7031C81.2414 79.7031 81.061 79.8834 81.061 80.1059C81.061 80.3284 81.2414 80.5087 81.4638 80.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="73.033" y="73.2862" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_7_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter13_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M77.4358 78.0918C77.6582 78.0918 77.8386 77.9115 77.8386 77.689C77.8386 77.4666 77.6582 77.2862 77.4358 77.2862C77.2133 77.2862 77.033 77.4666 77.033 77.689C77.033 77.9115 77.2133 78.0918 77.4358 78.0918Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="75.4497" y="74.0919" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_8_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter14_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M79.8525 78.8975C80.075 78.8975 80.2553 78.7171 80.2553 78.4947C80.2553 78.2722 80.075 78.0919 79.8525 78.0919C79.6301 78.0919 79.4497 78.2722 79.4497 78.4947C79.4497 78.7171 79.6301 78.8975 79.8525 78.8975Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="64.2429" y="62.8131" width="19.2788" height="17.3124"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_9_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter15_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M72.5993 75.7689C73.4103 76.2476 74.4139 76.2421 75.2267 75.7664C77.3323 74.534 79.5217 72.7827 79.5217 70.8412C79.5217 68.1688 78.0404 66.8131 73.9134 66.8131C69.7865 66.8131 68.2429 67.5799 68.2429 70.8412C68.2429 72.8012 70.7361 74.6691 72.5993 75.7689Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="50.2859" y="43.9994" width="11.5542" height="11.5542"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_10_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter16_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M56.063 51.5536C57.0445 51.5536 57.8401 50.758 57.8401 49.7765C57.8401 48.795 57.0445 47.9994 56.063 47.9994C55.0815 47.9994 54.2859 48.795 54.2859 49.7765C54.2859 50.758 55.0815 51.5536 56.063 51.5536Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M58.9064 57.9512C62.2434 57.9512 64.9486 55.246 64.9486 51.909C64.9486 48.572 62.2434 45.8669 58.9064 45.8669C55.5694 45.8669 52.8643 48.572 52.8643 51.909C52.8643 55.246 55.5694 57.9512 58.9064 57.9512Z" fill="white" fill-opacity="0.4"/>
      <foreignObject x="81.7051" y="43.9994" width="11.5542" height="11.5542"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_11_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter17_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M87.4822 51.5536C88.4637 51.5536 89.2593 50.758 89.2593 49.7765C89.2593 48.795 88.4637 47.9994 87.4822 47.9994C86.5007 47.9994 85.7051 48.795 85.7051 49.7765C85.7051 50.758 86.5007 51.5536 87.4822 51.5536Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M90.3256 57.9512C93.6626 57.9512 96.3678 55.246 96.3678 51.909C96.3678 48.572 93.6626 45.8669 90.3256 45.8669C86.9886 45.8669 84.2834 48.572 84.2834 51.909C84.2834 55.246 86.9886 57.9512 90.3256 57.9512Z" fill="white" fill-opacity="0.4"/>
      <foreignObject x="63.3657" y="75.7031" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_12_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter18_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M67.7685 80.5087C67.991 80.5087 68.1713 80.3284 68.1713 80.1059C68.1713 79.8834 67.991 79.7031 67.7685 79.7031C67.5461 79.7031 67.3657 79.8834 67.3657 80.1059C67.3657 80.3284 67.5461 80.5087 67.7685 80.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="66.5881" y="73.2862" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_13_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter19_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M70.9909 78.0918C71.2134 78.0918 71.3938 77.9115 71.3938 77.689C71.3938 77.4666 71.2134 77.2862 70.9909 77.2862C70.7685 77.2862 70.5881 77.4666 70.5881 77.689C70.5881 77.9115 70.7685 78.0918 70.9909 78.0918Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="65.7825" y="75.7031" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_14_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter20_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M70.1853 80.5087C70.4078 80.5087 70.5881 80.3284 70.5881 80.1059C70.5881 79.8834 70.4078 79.7031 70.1853 79.7031C69.9628 79.7031 69.7825 79.8834 69.7825 80.1059C69.7825 80.3284 69.9628 80.5087 70.1853 80.5087Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="64.1711" y="74.0919" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_15_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter21_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M68.574 78.8975C68.7964 78.8975 68.9768 78.7171 68.9768 78.4947C68.9768 78.2722 68.7964 78.0919 68.574 78.0919C68.3515 78.0919 68.1711 78.2722 68.1711 78.4947C68.1711 78.7171 68.3515 78.8975 68.574 78.8975Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="60.9487" y="74.0919" width="8.80566" height="8.80562"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_16_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter22_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M65.3515 78.8975C65.574 78.8975 65.7544 78.7171 65.7544 78.4947C65.7544 78.2722 65.574 78.0919 65.3515 78.0919C65.1291 78.0919 64.9487 78.2722 64.9487 78.4947C64.9487 78.7171 65.1291 78.8975 65.3515 78.8975Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M80.2555 82.5228C80.2555 84.9699 76.4485 89.7419 74.0013 89.7419C71.5542 89.7419 68.1711 84.9699 68.1711 82.5228C72.1993 82.9256 74.0013 80.4772 74.0013 76.8519C74.0013 80.5087 76.2274 83.3284 80.2555 82.5228Z" fill="white" fill-opacity="0.6"/>
      <foreignObject x="0.561279" y="14.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_17_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter23_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M4.56128 52.1795C5.68766 41.4627 10.7082 33.5789 47.5923 18.101C57.856 22.0789 45.0796 26.5789 35.5925 45.079C32.4418 51.2229 32.3561 56.579 26.3562 64.079C20.3563 71.579 20.5612 72.1794 4.56128 52.1795Z" fill="white" fill-opacity="0.4"/>
    </g>
      <foreignObject x="93.334" y="14.101" width="54.8271" height="58.7921"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_18_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter24_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M144.161 52.1795C143.035 41.4627 138.014 33.5789 101.13 18.101C90.8665 22.0789 103.643 26.5789 113.13 45.079C116.281 51.2229 116.366 56.579 122.366 64.079C128.366 71.579 128.161 72.1794 144.161 52.1795Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M73.7617 76.0468L73.3261 78.6604C73.0706 80.1933 71.9556 81.4421 70.4614 81.869V81.869C70.1018 81.9718 69.7296 82.0239 69.3556 82.0239L68.6823 82.0239C65.8333 82.0239 63.1591 80.6496 61.5007 78.333L59.3093 75.2721" stroke="white" stroke-opacity="0.6"/>
      <path d="M74.271 76.093L74.7066 78.7066C74.9621 80.2394 76.0771 81.4883 77.5713 81.9152V81.9152C77.9309 82.018 78.3031 82.0701 78.6771 82.0701L79.3504 82.0701C82.1995 82.0701 84.8736 80.6958 86.5321 78.3792L88.7234 75.3183" stroke="white" stroke-opacity="0.6"/>
      <foreignObject x="40.5293" y="4.7722" width="39.0811" height="34.8752"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_19_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter25_ii_704_12)" data-figma-bg-blur-radius="4">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M45.5033 10.3927C45.7415 9.16406 47.0367 8.45351 48.2008 8.91285L68.6961 16.9999L69.9837 22.3118C70.0588 22.6213 70.0588 22.9442 69.9839 23.2536L68.6961 28.5726L47.6794 35.5446C46.4766 35.9436 45.2106 35.1375 45.0633 33.8788L44.543 29.4332C44.4787 28.8841 44.6445 28.333 45.0011 27.9106L48.3324 23.9643C48.9198 23.2684 48.963 22.2636 48.4374 21.5199L44.9348 16.5636C44.6202 16.1184 44.5009 15.564 44.6047 15.0288L45.5033 10.3927Z" fill="white" fill-opacity="0.6"/>
    </g>
      <foreignObject x="67.6736" y="4.77219" width="38.6409" height="34.8752"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_20_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter26_ii_704_12)" data-figma-bg-blur-radius="4">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M101.341 10.3927C101.102 9.16405 99.8071 8.4535 98.643 8.91284L78.1477 16.9999L76.8601 22.3118C76.7851 22.6213 76.785 22.9442 76.86 23.2536L78.1477 28.5726L99.1644 35.5446C100.367 35.9436 101.633 35.1375 101.781 33.8788L102.301 29.4332C102.365 28.8841 102.199 28.333 101.843 27.9105L98.5114 23.9643C97.924 23.2684 97.8808 22.2636 98.4064 21.5199L101.909 16.5636C102.224 16.1184 102.343 15.564 102.239 15.0288L101.341 10.3927Z" fill="white" fill-opacity="0.6"/>
    </g>
      <foreignObject x="64" y="10" width="18.8909" height="24.9413"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_21_704_12_clip_path);height:100%;width:100%"></div></foreignObject><g filter="url(#filter27_ii_704_12)" data-figma-bg-blur-radius="4">
      <path d="M73.4454 30.9413C78.8908 30.9413 78.8908 27.1489 78.8908 22.4706C78.8908 17.7924 78.8908 14 73.4454 14C68 14 68 17.7924 68 22.4706C68 27.1489 68 30.9413 73.4454 30.9413Z" fill="white" fill-opacity="0.4"/>
    </g>
      <path d="M78 82.5C78 84.2086 75.852 87.0405 73.827 87.0405C71.802 87.0405 70 84.2086 70 82.5C73.5 81.5 73 80.5 74 78C75 80.5 75 82 78 82.5Z" fill="white" fill-opacity="0.6"/>
    </g>
    <defs>
      <filter id="filter0_d_704_12" x="0.561279" y="0.772194" width="161.6" height="110.53" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="4" dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.956863 0 0 0 0 0.364706 0 0 0 0 0.827451 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_704_12"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_704_12" result="shape"/>
      </filter>
      <filter id="filter1_i_704_12" x="10.5613" y="4.77219" width="139.6" height="90.5296" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      </filter>
      <filter id="filter2_ii_704_12" x="35" y="9.50002" width="89.8972" height="89.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
      </filter>
      <clipPath id="bgblur_0_704_12_clip_path" transform="translate(-35 -9.50002)"><path d="M71.7221 93.2403C77.1316 95.8281 83.3527 96.0084 88.852 93.6175C103.105 87.421 120.897 74.374 120.897 59.6585C120.897 41.719 107.174 13.5 80.2182 13.5C53.2623 13.5 39 43.2742 39 59.6585C39 73.0156 57.7438 86.5533 71.7221 93.2403Z"/>
      </clipPath><filter id="filter3_ii_704_12" x="6.56128" y="10.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_1_704_12_clip_path" transform="translate(-6.56128 -10.101)"><path d="M10.5613 48.1795C11.6877 37.4627 16.7082 29.5789 53.5923 14.101C63.856 18.0789 51.0796 22.5789 41.5925 41.079C38.4418 47.2229 38.3561 52.579 32.3562 60.079C26.3563 67.579 26.5612 68.1794 10.5613 48.1795Z"/>
      </clipPath><filter id="filter4_ii_704_12" x="99.334" y="10.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_2_704_12_clip_path" transform="translate(-99.334 -10.101)"><path d="M150.161 48.1795C149.035 37.4627 144.014 29.5789 107.13 14.101C96.8665 18.0789 109.643 22.5789 119.13 41.079C122.281 47.2229 122.366 52.579 128.366 60.079C134.366 67.579 134.161 68.1794 150.161 48.1795Z"/>
      </clipPath><filter id="filter5_ii_704_12" x="46.5293" y="0.772194" width="65.7852" height="34.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <filter id="filter6_i_704_12" x="50.5293" y="4.7722" width="31.0811" height="26.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      </filter>
      <filter id="filter7_i_704_12" x="77.6736" y="4.77219" width="30.6409" height="26.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      </filter>
      <filter id="filter8_i_704_12" x="74" y="10" width="10.8909" height="16.9413" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      </filter>
      <filter id="filter9_ii_704_12" x="29" y="13.5" width="89.8972" height="89.8017" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
      </filter>
      <clipPath id="bgblur_3_704_12_clip_path" transform="translate(-29 -13.5)"><path d="M65.7221 97.2403C71.1316 99.8281 77.3527 100.008 82.852 97.6175C97.1045 91.421 114.897 78.374 114.897 63.6585C114.897 45.719 101.174 17.5 74.2182 17.5C47.2623 17.5 33 47.2742 33 63.6585C33 77.0156 51.7438 90.5533 65.7221 97.2403Z"/>
      </clipPath><filter id="filter10_ii_704_12" x="77.8667" y="73.2862" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_4_704_12_clip_path" transform="translate(-77.8667 -73.2862)"><path d="M82.2695 78.0918C82.492 78.0918 82.6723 77.9115 82.6723 77.689C82.6723 77.4666 82.492 77.2862 82.2695 77.2862C82.047 77.2862 81.8667 77.4666 81.8667 77.689C81.8667 77.9115 82.047 78.0918 82.2695 78.0918Z"/>
      </clipPath><filter id="filter11_ii_704_12" x="73.8386" y="75.7031" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_5_704_12_clip_path" transform="translate(-73.8386 -75.7031)"><path d="M78.2414 80.5087C78.4639 80.5087 78.6442 80.3284 78.6442 80.1059C78.6442 79.8834 78.4639 79.7031 78.2414 79.7031C78.019 79.7031 77.8386 79.8834 77.8386 80.1059C77.8386 80.3284 78.019 80.5087 78.2414 80.5087Z"/>
      </clipPath><filter id="filter12_ii_704_12" x="77.061" y="75.7031" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_6_704_12_clip_path" transform="translate(-77.061 -75.7031)"><path d="M81.4638 80.5087C81.6863 80.5087 81.8667 80.3284 81.8667 80.1059C81.8667 79.8834 81.6863 79.7031 81.4638 79.7031C81.2414 79.7031 81.061 79.8834 81.061 80.1059C81.061 80.3284 81.2414 80.5087 81.4638 80.5087Z"/>
      </clipPath><filter id="filter13_ii_704_12" x="73.033" y="73.2862" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_7_704_12_clip_path" transform="translate(-73.033 -73.2862)"><path d="M77.4358 78.0918C77.6582 78.0918 77.8386 77.9115 77.8386 77.689C77.8386 77.4666 77.6582 77.2862 77.4358 77.2862C77.2133 77.2862 77.033 77.4666 77.033 77.689C77.033 77.9115 77.2133 78.0918 77.4358 78.0918Z"/>
      </clipPath><filter id="filter14_ii_704_12" x="75.4497" y="74.0919" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_8_704_12_clip_path" transform="translate(-75.4497 -74.0919)"><path d="M79.8525 78.8975C80.075 78.8975 80.2553 78.7171 80.2553 78.4947C80.2553 78.2722 80.075 78.0919 79.8525 78.0919C79.6301 78.0919 79.4497 78.2722 79.4497 78.4947C79.4497 78.7171 79.6301 78.8975 79.8525 78.8975Z"/>
      </clipPath><filter id="filter15_ii_704_12" x="64.2429" y="62.8131" width="19.2788" height="17.3124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_9_704_12_clip_path" transform="translate(-64.2429 -62.8131)"><path d="M72.5993 75.7689C73.4103 76.2476 74.4139 76.2421 75.2267 75.7664C77.3323 74.534 79.5217 72.7827 79.5217 70.8412C79.5217 68.1688 78.0404 66.8131 73.9134 66.8131C69.7865 66.8131 68.2429 67.5799 68.2429 70.8412C68.2429 72.8012 70.7361 74.6691 72.5993 75.7689Z"/>
      </clipPath><filter id="filter16_ii_704_12" x="50.2859" y="43.9994" width="11.5542" height="11.5542" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_10_704_12_clip_path" transform="translate(-50.2859 -43.9994)"><path d="M56.063 51.5536C57.0445 51.5536 57.8401 50.758 57.8401 49.7765C57.8401 48.795 57.0445 47.9994 56.063 47.9994C55.0815 47.9994 54.2859 48.795 54.2859 49.7765C54.2859 50.758 55.0815 51.5536 56.063 51.5536Z"/>
      </clipPath><filter id="filter17_ii_704_12" x="81.7051" y="43.9994" width="11.5542" height="11.5542" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_11_704_12_clip_path" transform="translate(-81.7051 -43.9994)"><path d="M87.4822 51.5536C88.4637 51.5536 89.2593 50.758 89.2593 49.7765C89.2593 48.795 88.4637 47.9994 87.4822 47.9994C86.5007 47.9994 85.7051 48.795 85.7051 49.7765C85.7051 50.758 86.5007 51.5536 87.4822 51.5536Z"/>
      </clipPath><filter id="filter18_ii_704_12" x="63.3657" y="75.7031" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_12_704_12_clip_path" transform="translate(-63.3657 -75.7031)"><path d="M67.7685 80.5087C67.991 80.5087 68.1713 80.3284 68.1713 80.1059C68.1713 79.8834 67.991 79.7031 67.7685 79.7031C67.5461 79.7031 67.3657 79.8834 67.3657 80.1059C67.3657 80.3284 67.5461 80.5087 67.7685 80.5087Z"/>
      </clipPath><filter id="filter19_ii_704_12" x="66.5881" y="73.2862" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_13_704_12_clip_path" transform="translate(-66.5881 -73.2862)"><path d="M70.9909 78.0918C71.2134 78.0918 71.3938 77.9115 71.3938 77.689C71.3938 77.4666 71.2134 77.2862 70.9909 77.2862C70.7685 77.2862 70.5881 77.4666 70.5881 77.689C70.5881 77.9115 70.7685 78.0918 70.9909 78.0918Z"/>
      </clipPath><filter id="filter20_ii_704_12" x="65.7825" y="75.7031" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_14_704_12_clip_path" transform="translate(-65.7825 -75.7031)"><path d="M70.1853 80.5087C70.4078 80.5087 70.5881 80.3284 70.5881 80.1059C70.5881 79.8834 70.4078 79.7031 70.1853 79.7031C69.9628 79.7031 69.7825 79.8834 69.7825 80.1059C69.7825 80.3284 69.9628 80.5087 70.1853 80.5087Z"/>
      </clipPath><filter id="filter21_ii_704_12" x="64.1711" y="74.0919" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_15_704_12_clip_path" transform="translate(-64.1711 -74.0919)"><path d="M68.574 78.8975C68.7964 78.8975 68.9768 78.7171 68.9768 78.4947C68.9768 78.2722 68.7964 78.0919 68.574 78.0919C68.3515 78.0919 68.1711 78.2722 68.1711 78.4947C68.1711 78.7171 68.3515 78.8975 68.574 78.8975Z"/>
      </clipPath><filter id="filter22_ii_704_12" x="60.9487" y="74.0919" width="8.80566" height="8.80562" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_16_704_12_clip_path" transform="translate(-60.9487 -74.0919)"><path d="M65.3515 78.8975C65.574 78.8975 65.7544 78.7171 65.7544 78.4947C65.7544 78.2722 65.574 78.0919 65.3515 78.0919C65.1291 78.0919 64.9487 78.2722 64.9487 78.4947C64.9487 78.7171 65.1291 78.8975 65.3515 78.8975Z"/>
      </clipPath><filter id="filter23_ii_704_12" x="0.561279" y="14.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_17_704_12_clip_path" transform="translate(-0.561279 -14.101)"><path d="M4.56128 52.1795C5.68766 41.4627 10.7082 33.5789 47.5923 18.101C57.856 22.0789 45.0796 26.5789 35.5925 45.079C32.4418 51.2229 32.3561 56.579 26.3562 64.079C20.3563 71.579 20.5612 72.1794 4.56128 52.1795Z"/>
      </clipPath><filter id="filter24_ii_704_12" x="93.334" y="14.101" width="54.8271" height="58.7921" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_18_704_12_clip_path" transform="translate(-93.334 -14.101)"><path d="M144.161 52.1795C143.035 41.4627 138.014 33.5789 101.13 18.101C90.8665 22.0789 103.643 26.5789 113.13 45.079C116.281 51.2229 116.366 56.579 122.366 64.079C128.366 71.579 128.161 72.1794 144.161 52.1795Z"/>
      </clipPath><filter id="filter25_ii_704_12" x="40.5293" y="4.7722" width="39.0811" height="34.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_19_704_12_clip_path" transform="translate(-40.5293 -4.7722)"><path fill-rule="evenodd" clip-rule="evenodd" d="M45.5033 10.3927C45.7415 9.16406 47.0367 8.45351 48.2008 8.91285L68.6961 16.9999L69.9837 22.3118C70.0588 22.6213 70.0588 22.9442 69.9839 23.2536L68.6961 28.5726L47.6794 35.5446C46.4766 35.9436 45.2106 35.1375 45.0633 33.8788L44.543 29.4332C44.4787 28.8841 44.6445 28.333 45.0011 27.9106L48.3324 23.9643C48.9198 23.2684 48.963 22.2636 48.4374 21.5199L44.9348 16.5636C44.6202 16.1184 44.5009 15.564 44.6047 15.0288L45.5033 10.3927Z"/>
      </clipPath><filter id="filter26_ii_704_12" x="67.6736" y="4.77219" width="38.6409" height="34.8752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_20_704_12_clip_path" transform="translate(-67.6736 -4.77219)"><path fill-rule="evenodd" clip-rule="evenodd" d="M101.341 10.3927C101.102 9.16405 99.8071 8.4535 98.643 8.91284L78.1477 16.9999L76.8601 22.3118C76.7851 22.6213 76.785 22.9442 76.86 23.2536L78.1477 28.5726L99.1644 35.5446C100.367 35.9436 101.633 35.1375 101.781 33.8788L102.301 29.4332C102.365 28.8841 102.199 28.333 101.843 27.9105L98.5114 23.9643C97.924 23.2684 97.8808 22.2636 98.4064 21.5199L101.909 16.5636C102.224 16.1184 102.343 15.564 102.239 15.0288L101.341 10.3927Z"/>
      </clipPath><filter id="filter27_ii_704_12" x="64" y="10" width="18.8909" height="24.9413" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_704_12"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="4"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_704_12" result="effect2_innerShadow_704_12"/>
    </filter>
      <clipPath id="bgblur_21_704_12_clip_path" transform="translate(-64 -10)"><path d="M73.4454 30.9413C78.8908 30.9413 78.8908 27.1489 78.8908 22.4706C78.8908 17.7924 78.8908 14 73.4454 14C68 14 68 17.7924 68 22.4706C68 27.1489 68 30.9413 73.4454 30.9413Z"/>
      </clipPath><linearGradient id="paint0_linear_704_12" x1="79.9487" y1="13.5" x2="79.9486" y2="96.6493" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FC4BF9"/>
      <stop offset="1" stop-color="#F45DD3"/>
    </linearGradient>
      <linearGradient id="paint1_linear_704_12" x1="54.9353" y1="41.0524" x2="11.787" y2="36.5173" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FC4BF9"/>
        <stop offset="1" stop-color="#F45DD3"/>
      </linearGradient>
      <linearGradient id="paint2_linear_704_12" x1="105.787" y1="41.0524" x2="148.935" y2="36.5173" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FC4BF9"/>
        <stop offset="1" stop-color="#F45DD3"/>
      </linearGradient>
      <linearGradient id="paint3_linear_704_12" x1="83.1501" y1="18.8556" x2="50.3063" y2="18.1443" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FC4BF9"/>
        <stop offset="1" stop-color="#F45DD3"/>
      </linearGradient>
      <linearGradient id="paint4_linear_704_12" x1="76.306" y1="18.8424" x2="108.537" y2="18.1443" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FC4BF9"/>
        <stop offset="1" stop-color="#F45DD3"/>
      </linearGradient>
      <linearGradient id="paint5_linear_704_12" x1="79.4454" y1="10" x2="79.4454" y2="26.9413" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FC4BF9"/>
        <stop offset="1" stop-color="#F45DD3"/>
      </linearGradient>
    </defs>
  </svg>


</template>

<style scoped lang="scss">
@use 'sass:map';

.icon-common {
  width: 100%;
  height: 100%;
  &:hover {
    path {
      fill: #2D2D2D;
    }
  }
  path {
    transition: fill 0.3s;
  }
}
</style>