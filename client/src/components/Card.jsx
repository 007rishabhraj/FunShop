import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function CardModel({ image, name, price, id, description }) {
    return (
        <div className="flex justify-center items-center">
            <Card className="py-4 w-80 min-h-[30rem]">
                <CardBody className="overflow-visible py-2 flex justify-center">
                    <Image
                        alt="Image background"
                        className="object-contain rounded-xl fit"
                        src={image}
                        width={400}
                        height={225}
                    />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-medium uppercase font-bold line-clamp-2">
                        {name}
                    </p>
                    <small className="text-default-600">$ {price}</small>
                    <h4 className="font-medium line-clamp-3">{description}</h4>
                    <div className="flex justify-center items-center">
                        <Link
                            to={`/product/${id}`}
                            className=" relative bottom-[2px] bg-blue-600 hover:bg-blue-700 text-white items-center font-semibold py-2 px-4 rounded-lg my-2"
                        >
                            Shop Now
                        </Link>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
