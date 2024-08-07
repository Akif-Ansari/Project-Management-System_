import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";

const Settings = () => {
  const [username, setUsername] = useState<string>("");
  const [theme, setTheme] = useState<string>("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { setSettings } = useAuth();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSettings({ username, theme, notificationsEnabled });
    console.log("Settings saved:", { username, theme, notificationsEnabled });
  };

  return (
    <div className="w-full flex flex-col items-start pt-12 px-8">
      <h1 className="text-2xl font-medium mb-6">Settings</h1>

      <div className="w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            className="w-full outline-none border px-4 py-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="theme">
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e: any) => setTheme(e.target.value)}
            className="w-full outline-none border px-4 py-2 rounded-md"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Notifications
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled((x: boolean) => !x)}
              className="mr-2"
            />
            <span>Enable notifications</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-6 py-2 text-base bg-purple-500 text-white rounded-md"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
