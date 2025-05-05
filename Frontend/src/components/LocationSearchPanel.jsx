import React from 'react'

const LocationSearchPanel = (props) => {
  const {
    
    setPanelOpen,
    setVehiclePanelOpen,
    suggestions = [],
    onSuggestionSelect
  } = props;

  // If suggestions are provided, show them, else fallback to static locations
  const locations = suggestions.length > 0 ? suggestions : [
    { description: "12B, Vesu near D-Mart, surat, gujarat" },
    { description: "11DC, Bhestan ambedkar chowki, surat, gujarat" },
    { description: "19, Althan near hanuman mandir, surat, gujarat" },
  ];

  return (
    <div>
      {locations.map((location, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (onSuggestionSelect) {
              onSuggestionSelect(location);
            } else {
              setVehiclePanelOpen(true);
              setPanelOpen(false);
            }
          }}
          className='flex gap-3 items-center justify-start my-2 border-2 border-gray-100 active:border-black rounded-xl p-3'
        >
          <h2 className='bg-[rgb(238,238,238)] h-10 flex items-center justify-center w-12 rounded-full'>
            <i className="ri-map-pin-2-fill"></i>
          </h2>
          <h4 className='font-medium'>{location.description || location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;