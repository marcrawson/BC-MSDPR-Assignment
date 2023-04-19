let main = 1;
        const acronym_object = [
            // acronyms saved here
            {key: 'MSDPR', val: 'Ministry of Social Development and Poverty Reduction'},
        ]

        function SearchBar({handleSearchChange}){
            return(
                <div id="search-bar">
                    <input type="text" id="search-text" placeholder="Search acronym..." spellCheck="false" onChange={handleSearchChange}/>
                    <button id="search-enter"></button>
                </div>
            )
        }

        function Acronyms({searchValue}){
            const filter = acronym_object.filter( item => item.key.toLowerCase().includes(searchValue) );
            if(filter.length > 0) return (
                <div id="acronyms">
                    { 
                        filter.map( item =>
                            <div className="acronym-insert">
                                <div className="acronym-key"> {item.key} </div>
                                <div className="acronym-val"> {item.val} </div>
                            </div>
                        )
                    }   
                </div>
            )

            else return (
                <div id="acronyms">
                    <div className="acronym-insert">
                        <div className="acronym-key"> No results found </div>
                    </div>
                </div>
            )
        }

        function Main(){
            const [searchValue, setSearchValue] = React.useState("");
            const [page, setPage] = React.useState(1);
            
            function handleSearchChange(e){
                setSearchValue(e.target.value.toLowerCase());
            }

            function handlePageChange(i){
                setSearchValue('');
                setPage(i);
            }

            function handleAddCheck(){
                const key = document.getElementById("new-acronym-key").value.trim();
                const val = document.getElementById("new-acronym-val").value.trim();
                const button = document.getElementById("add-button").classList;

                if(key.length > 0 && val.length > 0){
                    button.remove('disable');
                    return true;
                }
                else{
                    button.add('disable');
                    return false;
                }
            }

            function handleAddAcronym(){
                const key = document.getElementById("new-acronym-key").value.trim();
                const val = document.getElementById("new-acronym-val").value.trim();

                if(handleAddCheck()) acronym_object.push({key, val});
                setPage(1);
            }

            // Landing Page
            if(page == 1){
                return(
                    <div id="main-components">
                        <header>
                            <h1>Welcome!</h1>
                            <SearchBar handleSearchChange={handleSearchChange}/>
                            <button id="acronym-add" onClick={() => handlePageChange(2)}> Add Acronym</button>
                        </header>
                        <Acronyms searchValue = {searchValue} />
                    </div>
                ); 
            }

            // Add Acronym
            else if(page == 2){
                return(
                    <div id="main-components">
                        <header>
                            <h1>New Acronym</h1>    
                        </header>

                        <input type="text" id="new-acronym-key" placeholder="Enter acronym..." onChange={ handleAddCheck }/>
                        <textarea id="new-acronym-val" placeholder="Enter definition..." onChange={ handleAddCheck }/>

                        <div id="new-acronym-buttons">
                            <button onClick = { () => handlePageChange(1) }>Cancel</button>
                            <button onClick = { handleAddAcronym } id="add-button" className="disable">Add</button>
                        </div>
                        
                    </div>
                )
            }

        };

        // Render the component to the DOM
        ReactDOM.render(<Main />, document.getElementById('root'));