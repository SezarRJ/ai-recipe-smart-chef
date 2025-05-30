{/* Cooking & Planning */}
<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cooking & Planning</h3>
<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
  {quickActionsCookingPlanning.map((action, index) => (
    <Link
      key={index}
      to={action.path}
      className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mb-2 text-teal-600 dark:text-teal-300">
        {action.icon}
      </div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
        {action.label}
      </span>
    </Link>
  ))}
</div>

{/* Community & Rewards */}
<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Community & Rewards</h3>
<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
  {quickActionsCommunityRewards.map((action, index) => (
    <Link
      key={index}
      to={action.path}
      className="flex flex-col items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-center"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-2 text-orange-600 dark:text-orange-300">
        {action.icon}
      </div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
        {action.label}
      </span>
    </Link>
  ))}
</div>
