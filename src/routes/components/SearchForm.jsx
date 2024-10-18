import { useEffect, useRef, useState } from 'react';
import useGetAutocomplete from '../../hooks/useGetAutocomplete';
import './SearchForm.css';
function SearchForm({ onSubmit }) {
  const { results, searchCities, resetCities } = useGetAutocomplete();
  const [open, setOpen] = useState(false);
  const searchInput = useRef();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  }, []);
  useEffect(() => {
    open ? searchInput.current.focus() : null;
  }, [open]);

  return open ? (
    <div className="form-search" onClick={() => setOpen(false)}>
      <form
        action=""
        className="form-lg form-modal"
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-header-box">
          <div className="form-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#646464"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="input input-search"
              placeholder="Search your city..."
              onInput={(event) => searchCities(event.target.value)}
              ref={searchInput}
            />
          </div>
        </div>

        <div className="cities-prediction-box">
          {results
            ? results.map((city) => (
                <div
                  className="city"
                  onClick={() => {
                    onSubmit(city.lat, city.lng);
                    setOpen(false);
                    resetCities();
                  }}
                  key={city.lat}
                >
                  <div className="city-info-box">
                    <div
                      className="city-flag-box"
                      style={{
                        backgroundImage: `url(https://flagsapi.com/${city.country}/shiny/64.png)`,
                      }}
                    ></div>
                    <span>
                      {city.name} - {city.country}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              ))
            : null}
        </div>
        <div className="form-footer-box">
          <div className="form-footer"></div>
        </div>
      </form>
    </div>
  ) : (
    <div>
      <button onClick={() => setOpen(true)} className="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  );
}

export default SearchForm;
