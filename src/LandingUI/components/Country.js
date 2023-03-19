import React from 'react';

export default function country() {
  return (
    <>
      <div className="flex w-11 h-11 rounded-full">
        <select
          id="language"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose Language</option>
          <option value="AE">🇦🇪 Arabic</option>
          <option value="BG">🇧🇬 Bulgarian</option>
          <option value="CN">🇨🇳 Chinese (S)</option>
          <option value="TW">🇹🇼 Chinese (T)</option>
          <option value="CZ">🇨🇿 Czech</option>
          <option value="DK">🇩🇰 Danish</option>
          <option value="NL">🇳🇱 Dutch</option>
          <option value="US">🇺🇸 English</option>
          <option value="IR">🇮🇷 Farsi</option>
          <option value="PH">🇵🇭 Filipino</option>
          <option value="FI">🇫🇮 Finnish</option>
          <option value="FR">🇫🇷 French</option>
          <option value="DE">🇩🇪 German</option>
          <option value="GR">🇬🇷 Greek</option>
          <option value="IL">🇮🇱 Hebrew</option>
          <option value="IN">🇮🇳 Hindi</option>
          <option value="HU">🇭🇺 Hungarian</option>
          <option value="ID">🇮🇩 Indonesian</option>
          <option value="IT">🇮🇹 Italian</option>
          <option value="JP">🇯🇵 Japanese</option>
          <option value="KR">🇰🇷 Korean</option>
          <option value="LT">🇱🇹 Lithuanian</option>
          <option value="MY">🇲🇾 Malay</option>
          <option value="NO">🇳🇴 Norwegian</option>
          <option value="PL">🇵🇱 Polish</option>
          <option value="PT">🇵🇹 Portuguese</option>
          <option value="RO">🇷🇴 Romanian</option>
          <option value="RU">🇷🇺 Russian</option>
          <option value="SK">🇸🇰 Slovak</option>
          <option value="SI">🇸🇮 Slovenian</option>
          <option value="ES">🇪🇸 Spanish</option>
          <option value="SE">🇸🇪 Swedish</option>
          <option value="TH">🇹🇭 Thai</option>
          <option value="TR">🇹🇷 Turkish</option>
          <option value="UA">🇺🇦 Ukrainian</option>
          <option value="VN">🇻🇳 Vietnamese</option>
        </select>
      </div>
    </>
  );
}
