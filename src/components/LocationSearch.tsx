import { Button, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import {useState, useMemo, useContext, useEffect} from 'react';
import SearchIcon from '../icons/Search'
import { UserContext } from '@/App'
import { debouncedSearchLocations, getLocation } from '@/api'

export const LocationSearch = ({onLocationSelect}) => {
    const [items, setItems] = useState([])
    const [searchString, setSearchString] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    
    useEffect(() => {
        if (searchString && searchString.length) {
            debouncedSearchLocations(searchString, function(locations) {
                console.log('locations:', locations)
                setItems(locations)
            })
        }
    }, [searchString])
    
    const itemText = (item) => {
        if (item.name_3)
            return `${item.name_3},${item.name_2},${item.name_1}`
        if (item.name_2)
            return `${item.name_2},${item.name_1}`
        return `${item.name_1}`
    }
    return (<>  
        <Button className={showSearch?'':'bg-white'} isIconOnly radius="none" color={showSearch?"primary":"white"} variant='solid' 
            style={{border: '1px solid', verticalAlign: 'top'}}
            onPress={() => { setShowSearch(!showSearch) }} size="sm">
            <SearchIcon size={14} color={showSearch?"#fff":"#006FEE"} filled={false} />
        </Button>
        {showSearch?<div className="ml-2" style={{width: '400px', display: 'inline-block'}}>
            <Autocomplete placeholder="Search for a location" variant='faded' size='sm'
                aria-label='select location'
                startContent={<SearchIcon size={14} color="#121213" filled={false} />}
                inputValue={searchString}
                onInputChange={(value) => {
                    setSearchString(value)
                }}
                items={items}
                classNames="bordered-small"
                onSelectionChange={(sel) => {
                    if ( sel === null ) return
                    console.log('location:', sel);
                    getLocation(sel).then((feature) => {
                        console.log('getFeature', feature)
                        onLocationSelect(feature)
                    })
                }}
            >
                {(item) => <AutocompleteItem key={item.gid}>{itemText(item)}</AutocompleteItem>}
            </Autocomplete>
        </div>:null}
    </>)

}
