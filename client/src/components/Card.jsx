import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function CardModel({ image, name, price, id ,description}) {
    return (
        <div className='flex justify-center items-center'>
            <Card className="py-4">
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Image background"
                        className="object-cover rounded-xl"
                        src={image}
                        width={270}
                    />
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-medium uppercase font-bold">{name}</p>
                        <small className="text-default-500">
                         &#8377;{price}
                        </small>
                        <h4 className="font-medium">{description}</h4>
                        <div className="flex justify-center items-center">
                            <Link
                                to={`/product/${id}`}
                                className="bg-blue-600 hover:bg-blue-700 text-white items-center font-semibold py-2 px-4 rounded-lg my-2"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </CardHeader>
                </CardBody>
            </Card>
        </div>
    );
}
