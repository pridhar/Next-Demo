import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {title, content} = req.body

	try {
		if(title!='' || content!=''){
			await prisma.note.create({
				data: {
					title,
					content
				}
			})
		
			res.status(200).json({message: 'welcome ' + title})
		}
		
		
	} catch{
		res.status(400).json({message: 'Bad Request'})
	}
}