"use client"

import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

//Libs and Utils
import { formatPlaceholder } from "@/lib/formatSubHeading";
import { makeApiRequest } from "@/lib/apiUtils";

//Icons
import { ChartCircle, SearchNormal1 } from "iconsax-react";

//Components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";


const HeaderSearch = () => {

    const pathName = usePathname()
    const updatedPathname = pathName.replace(/^\//, "");
    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        setLoading(true)

        if (searchText.trim() === "") {
            setSearchResults([])
            return
        }
        try {
            makeApiRequest(`/search?name=${encodeURIComponent(searchText)}`, "get", "", {
                onSuccess: (response) => {
                    setSearchResults(response.data.data);
                    setType(response.data.metadata.type)
                    setIsDialogOpen(true);
                    setLoading(false)
                },
                onError: (error: any) => {
                    console.error('Search Error:', error);
                    setLoading(false)
                },
            });
        } catch (error) {
            console.error('Search error:', error)
            toast.error("Search Error, kindly try again later.")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <>
            <main className="px-3 flex items-center gap-x-1 border-2 border-light-400 dark:border-dark-400 rounded-[2rem]">
                <SearchNormal1 size="20" variant={searchText.length !== 0 ? "Bold" : "Outline"} />
                <input type="search" className="bg-inherit focus:border-none focus:outline-none py-3 rounded-[2rem] w-full px-2 placeholder:text-xs md:placeholder:text-sm" placeholder={formatPlaceholder(updatedPathname)} onChange={handleChange} onKeyDown={handleKeyPress} value={searchText} disabled={formatPlaceholder(updatedPathname) === "Search Unavailable"} />
                <Button variant="ghost" size="sm" onClick={handleSearch} className="ml-2">
                    {loading ? <ChartCircle size="14" color="#FF8A65" className="animate-spin"/> : "Search"}
                </Button>
            </main>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Search Results</DialogTitle>
                        <DialogDescription>Your {type} Result</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {searchResults.length > 0 ? (
                            <ul className="space-y-2">
                                {searchResults.map((result, index) => (
                                    <li key={index} className="p-2 bg-secondary rounded-md">
                                        {Object.entries(result).map(([key, value]) => (
                                            <p key={key}>
                                                <span className="font-semibold">{key}:</span>{" "}
                                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                            </p>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default HeaderSearch