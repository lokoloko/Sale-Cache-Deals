'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useEffect, useState } from 'react'; // 🔧 Placeholder imports for data fetching and infinite scroll

export default function TagPage() {
  const params = useParams();
  const tagName = Array.isArray(params.tagName) ? params.tagName[0] : params.tagName;

  // 🔧 Placeholder state for items
  const [items, setItems] = useState<any[]>([]);
  // 🔧 Placeholder state for loading and pagination
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 🔧 Placeholder function to fetch items by tag
  const fetchItemsByTag = async (tag: string, page: number) => {
    console.log(`// 🔧 Fetching items for tag: ${tag}, page: ${page}`);
    // Replace with actual data fetching logic
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        // Simulate fetching data
        const fetchedItems = [
          // 🔧 Add placeholder item data here
          { id: 1, title: `${tag} Item 1`, description: `Description for ${tag} Item 1`, tags: [tag, 'another'], price: '$10' },
          { id: 2, title: `${tag} Item 2`, description: `Description for ${tag} Item 2`, tags: [tag, 'example'], price: '$20' },
        ];
        resolve(fetchedItems);
      }, 1000);
    });
  };

  useEffect(() => {
    if (tagName) {
      // 🔧 Initial data fetch
      fetchItemsByTag(tagName as string, 1).then(data => {
        setItems(data);
        setLoading(false);
        // 🔧 Determine if there is more data for infinite scroll/pagination
        setHasMore(data.length > 0);
      });
    }
  }, [tagName]);

  // 🔧 Placeholder for infinite scroll or pagination
  const loadMoreItems = () => {
    if (!loading && hasMore) {
      setLoading(true);
      fetchItemsByTag(tagName as string, page + 1).then(data => {
        setItems(prevItems => [...prevItems, ...data]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
        // 🔧 Determine if there is more data
        setHasMore(data.length > 0);
      });
    }
  };

  // 🔧 Add scroll listener for infinite scroll if needed
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore && !loading) {
  //       loadMoreItems();
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [hasMore, loading]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Items Tagged with: {tagName}</h1>

      {/* 🔧 Placeholder for infinite scroll/pagination display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          // 🔧 Replace with your actual Item Card component
          <Card key={item.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag: string) => (
                   <Link key={tag} href={`/tag/${tag}`} passHref>
                    <Badge variant="secondary" className="cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
              <p className="text-lg font-semibold">{item.price}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/deals/${item.id}`} passHref className="w-full">
                 <Button className="w-full">View Deal</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 🔧 Placeholder for loading indicator */}
      {loading && <div className="text-center mt-4">Loading...</div>}

      {/* 🔧 Placeholder for "Load More" button if not using infinite scroll */}
      {/* {!loading && hasMore && (
        <div className="text-center mt-4">
          <Button onClick={loadMoreItems}>Load More</Button>
        </div>
      )} */}
    </div>
  );
}