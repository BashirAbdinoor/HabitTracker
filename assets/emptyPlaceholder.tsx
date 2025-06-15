
export default function EmptyPlaceholder(){
    return (
        <div className="flex jutify-center items-center p-5 flex-col">
            <ListIcon />
            <span className="text-[13px] text-gray-400">
                Nothing scheduled for this day
            </span>
        </div>
    )
}

function ListIcon() {
    return (
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* First Path: Curved lines */}
        <path
          d="M9 14C9.18131 14.4723 9.47841 14.8915 9.864 15.219C11.0903 16.2483 12.8748 16.2613 14.116 15.25C14.5069 14.9283 14.8109 14.5136 15 14.044"
          stroke="#5bc363"
          strokeWidth="1.5"  // Updated to strokeWidth
          strokeLinecap="round"  // Updated to strokeLinecap
          strokeLinejoin="round"  // Updated to strokeLinejoin
        />
  
        {/* Second Path: Circle */}
        <path
          fillRule="evenodd"  // Updated to fillRule
          clipRule="evenodd"  // Updated to clipRule
          d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12Z"
          stroke="#5bc363"
          strokeWidth="1.5"  // Updated to strokeWidth
          strokeLinecap="round"  // Updated to strokeLinecap
          strokeLinejoin="round"  // Updated to strokeLinejoin
        />
  
        {/* Third Path: Vertical Line Left */}
        <path
          d="M9 11V10"
          stroke="#5bc363"
          strokeWidth="1.5"  // Updated to strokeWidth
          strokeLinecap="round"  // Updated to strokeLinecap
        />
  
        {/* Fourth Path: Vertical Line Right */}
        <path
          d="M15 11V10"
          stroke="#5bc363"
          strokeWidth="1.5"  // Updated to strokeWidth
          strokeLinecap="round"  // Updated to strokeLinecap
        />
      </svg>
    );
  }
  