import * as React from "react";
import type { SVGProps } from "react";
const SvgViewList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.5 6.75h15a3 3 0 0 1 3 3v4.5a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-4.5a3 3 0 0 1 3-3m0 1.5A1.5 1.5 0 0 0 3 9.75v4.5a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-4.5a1.5 1.5 0 0 0-1.5-1.5zM1.5 3a.75.75 0 0 1 .75-.75h19.5a.75.75 0 1 1 0 1.5H2.25A.75.75 0 0 1 1.5 3m0 18a.75.75 0 0 1 .75-.75h19.5a.75.75 0 1 1 0 1.5H2.25A.75.75 0 0 1 1.5 21"
    />
  </svg>
);
export default SvgViewList;
