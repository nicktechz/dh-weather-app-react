import { useEffect, useState } from 'react';
import useGetAutocomplete from '../../hooks/useGetAutocomplete';
import './SearchForm.css';
function SearchForm({ onSubmit }) {
  const { cities, search, resetCities } = useGetAutocomplete();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
  }, []);
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
              onInput={(event) => search(event.target.value)}
            />
          </div>
        </div>

        <div className="cities-prediction-box">
          {cities
            ? cities.map((city) => (
                <div
                  className="city"
                  onClick={() => {
                    onSubmit(city.city);
                    setOpen(false);
                    resetCities();
                  }}
                >
                  <div className="city-info-box">
                    <div
                      className="city-flag-box"
                      style={{
                        backgroundImage: `url(https://flagsapi.com/${city.code.toUpperCase()}/shiny/64.png)`,
                      }}
                    ></div>
                    <span>
                      {city.city} - {city.country}
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
          <div className="form-footer">
            <a href="" className="form-github-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#404040"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <p>GitHub Repository</p>
            </a>
          </div>
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
