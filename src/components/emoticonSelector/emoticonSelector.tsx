import React, { useState, useEffect } from 'react';
import './emoticonSelector.css';

interface Emoticon {
  character: string;
  slug: string;
}

interface EmoticonSelectorProps {
  onClose: (character: string) => void;
}

function EmoticonSelector({ onClose }: EmoticonSelectorProps) {
  const [emoticons, setEmoticons] = useState<Emoticon[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    fetch('https://emoji-api.com/emojis?access_key=21c6b9eadff21ec55a011ad4620bb1cd1ba2203e')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmoticons(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredEmoticons = emoticons.filter((el) =>
    el.slug.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="emoticon-selector">
      <span className="search-emoticon-box">
        <input
          placeholder="Aa"
          className="search-emoticon-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </span>
      <div className="emoticon-container">
        {filteredEmoticons.length > 0 ? (
          filteredEmoticons.map((emoticon, index) => (
            <span
              key={index}
              className="emoticon"
              onClick={() => {
                onClose(emoticon.character);
              }}
            >
              {emoticon.character}
            </span>
          ))
        ) : (
          <span className="not-found">Not found<br />emoticons</span>
        )}
      </div>
    </div>
  );
}

export default EmoticonSelector;