type PropertyPageProps = {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
};

const PropertyPage = ({ params }: PropertyPageProps) => {
    return (<section>Property Page {params.id}</section>);
}

export default PropertyPage;