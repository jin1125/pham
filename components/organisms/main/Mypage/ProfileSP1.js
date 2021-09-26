import React from 'react'

export const ProfileSP1 = ({userName,displayName,jobTitle}) => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-end my-5 gap-8 text-center">
    <div>
      {userName ? (
        <h2 className="text-4xl font-bold">{userName}</h2>
      ) : (
        <h2 className="text-4xl font-bold">{displayName}</h2>
      )}
    </div>

    {jobTitle && (
      <div>
        <p className="text-xl font-bold text-blue-400">{jobTitle}</p>
      </div>
    )}
  </div>
  )
}
