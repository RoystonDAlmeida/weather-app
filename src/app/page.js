// app/page.js
import Header from "./Components/Header"
import RoundedBox from "./Components/RoundedBox";
import LocationAccess from "./LocationAccess/LocationAccess";

export default function Home() {
  return (
    <div>
      <Header/>
      <main className="main">
          {/* Include the Full Width Box */}
          <RoundedBox />
                
          {/* Include the Location Access component */}
          <LocationAccess />
      </main>
    </div>
  );
}
