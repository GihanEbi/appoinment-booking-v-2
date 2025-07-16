import { SVGProps } from 'react';
type commonProps = React.SVGProps<SVGSVGElement>;

export function PlusIcon(props: commonProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.35"
        d="M19 10C18.722 10 16.553 10 14 10C14 7.447 14 5.278 14 5C14 3.895 13.105 3 12 3C10.895 3 10 3.895 10 5C10 5.278 10 7.447 10 10C7.447 10 5.278 10 5 10C3.895 10 3 10.895 3 12C3 13.105 3.895 14 5 14C5.2 14 18.8 14 19 14C20.105 14 21 13.105 21 12C21 10.895 20.105 10 19 10Z"
        fill="currentColor"
      />
      <path
        d="M12 21C13.105 21 14 20.105 14 19C14 18.722 14 16.553 14 14H10C10 16.553 10 18.722 10 19C10 20.105 10.895 21 12 21Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DeleteIcon(props: commonProps) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.35"
        d="M18.2444 23.1145H7.95255C6.24719 23.1145 4.86499 21.7323 4.86499 20.0269V6.64746H21.332V20.0269C21.332 21.7323 19.9498 23.1145 18.2444 23.1145Z"
        fill="currentColor"
      />
      <path
        d="M17.2149 4.58962H8.98145V3.56044C8.98145 2.99233 9.44252 2.53125 10.0106 2.53125H16.1858C16.7539 2.53125 17.2149 2.99233 17.2149 3.56044V4.58962Z"
        fill="currentColor"
      />
      <path
        d="M20.3027 3.56055C19.6841 3.56055 6.51261 3.56055 5.89407 3.56055C4.75682 3.56055 3.83569 4.48167 3.83569 5.61892C3.83569 6.75617 4.75682 7.6773 5.89407 7.6773C6.51261 7.6773 19.6841 7.6773 20.3027 7.6773C21.4399 7.6773 22.3611 6.75617 22.3611 5.61892C22.3611 4.48167 21.4399 3.56055 20.3027 3.56055Z"
        fill="currentColor"
      />
    </svg>
  );
}
