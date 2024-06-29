import Category from "@/components/Requests";

const getCategories = async () => {
    const response = await fetch(`${process.env.HOST}/api/category/get`, { cache: 'no-store' })
    const data = await response.json()
    if (data.error) {
        console.log(data.error)
    }
    else {
        return data
    }
}