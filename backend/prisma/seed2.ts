// import { PrismaClient, QuestionState } from '@prisma/client'
// const prisma = new PrismaClient()
//
// async function main() {
//   //////////////////////////////////////////////////////////////
//   // Users
//   //////////////////////////////////////////////////////////////
//
//   const citizena = await prisma.user.upsert({
//     where: { loginName: 'citizena' },
//     update: {},
//     create: {
//       loginName: 'citizena',
//       publicName: 'Hawker King',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const citizenb = await prisma.user.upsert({
//     where: { loginName: 'citizenb' },
//     update: {},
//     create: {
//       loginName: 'citizenb',
//       publicName: 'Ashraf I',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const citizenc = await prisma.user.upsert({
//     where: { loginName: 'citizenc' },
//     update: {},
//     create: {
//       loginName: 'citizenc',
//       publicName: 'Prasanna A',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const citizend = await prisma.user.upsert({
//     where: { loginName: 'citizend' },
//     update: {},
//     create: {
//       loginName: 'citizend',
//       publicName: 'Citizen D',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const citizene = await prisma.user.upsert({
//     where: { loginName: 'citizene' },
//     update: {},
//     create: {
//       loginName: 'citizene',
//       publicName: 'Citizen E',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const citizenf = await prisma.user.upsert({
//     where: { loginName: 'citizenf' },
//     update: {},
//     create: {
//       loginName: 'citizenf',
//       publicName: 'Citizen F',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const citizeng = await prisma.user.upsert({
//     where: { loginName: 'citizeng' },
//     update: {},
//     create: {
//       loginName: 'citizeng',
//       publicName: 'Citizen G',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const screener = await prisma.user.upsert({
//     where: { loginName: 'screener' },
//     update: {},
//     create: {
//       loginName: 'screener',
//       publicName: 'Linda Lindblom',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const officer = await prisma.user.upsert({
//     where: { loginName: 'officer' },
//     update: {},
//     create: {
//       loginName: 'officer',
//       publicName: 'Ho Jing Xian',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   const poster = await prisma.user.upsert({
//     where: { loginName: 'poster' },
//     update: {},
//     create: {
//       loginName: 'poster',
//       publicName: 'Poster',
//       canScreen: false,
//       canWriteAnswer: false,
//       canPostAnswer: false,
//     },
//   })
//
//   //////////////////////////////////////////////////////////////
//   // Questions
//   //////////////////////////////////////////////////////////////
//
//   await prisma.question.create({
//     data: {
//       text: 'What financial support schemes are available at WAS?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'WAS offers a Jobseeker Allowance Scheme and a Small Business Worker Income Support Package to help with the optimal allocation of work in Singapore.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'How do I apply for a WAS scheme?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'Applicants may go to our official website to submit their applications via the relevant online forms.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'How long does a WAS financial support scheme application take to process?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'Applications typically take 2-3 weeks to process. In cases with complex circumstances, applications may take up to a month.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'How much is given out annually via WAS schemes?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'WAS gives out about $120,000 annually through its financial support schemes. Most of it is through Jobseeker Allowances, with the rest providing Small Business Worker Income Support',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'My application for financial support was rejected. Can I apply again?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'Applicants are advised to allow for a period of about 3 months before making an application again.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'What other non-support financial programmes are run by WAS?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'WAS administers the National Creativity Award, which recognises innovations made in the course of government work.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'I am currently unemployed and need as much financial support as possible. Can I apply for both the WAS Jobseeker Allowance and an apprenticeship sponsored by WAS at the same time?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'We currently do not allow for applications for financial support and apprenticeship at the same time. This is to prevent overallocation of funds to individuals and to optimise allocation of work done in processing applications. We apologise for the inconvenience caused.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'Which industry sectors have WAS-sponsored apprenticeships available?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'WAS sponsors apprenticeships in sectors it identifies as in need of significant manpower. This currently includes:\n- Marine Engineering\n- Nursing and Allied Professions\n- Social Services',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'Why does WAS not provide apprenticeships across all of industry?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {},
//       downedBy: {
//         create: [
//           { user: { connect: { id: citizend.id } } },
//           { user: { connect: { id: citizene.id } } },
//         ],
//       },
//       answers: {
//         create: {
//           text: 'The Singapore Government has tasked WAS with the mandate of optimum allocation of work. To this end, its programmes and initiatives focus on directing people to industry sectors where the need for manpower is keenest.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {},
//           downedBy: {},
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'How long can WAS-sponsored apprenticeships run for?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'WAS-sponsored apprenticeships should last no longer than 12 months. Beyond this period, the employer should consider converting the apprentice to a full-time employment.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'What is the minimum stipend that is given to the apprentice?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'The minimum stipend given to WAS-sponsored apprentices is means-tested annually and is $3000 as of 2021. 75% of this will be provided by WAS, with the remainder topped up by the employer.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'I am a representative of my industry sector and would like WAS to consider sponsoring apprenticeships in my sector. How should I make an appeal to WAS to do this?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'You may email WAS at industry.relations@was.gov.sg to make a case for your industry sector to be considered.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'How do I offer WAS-sponsored apprenticeships through my own company?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'Company owners or human resources officers employers who wish to offer apprenticeships may go to our official website to submit their applications via the relevant online forms.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'Can I offer more than the minimum stipend for WAS-sponsored apprenticeships?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'An employer may offer more than the minimum stipend, however, any additional salary costs shall be borne solely by the employer.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'What kind of support can WAS provide to understaffed companies?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'As part of its mission to optimise allocation of work in Singapore, WAS offers the following programmes to employers:\n- Apprenticeships\n- Robotics and Automation Subsidies',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'How do I apply for a subsidy for robotics and automation?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'Understaffed companies may go to our official website to submit their applications via the relevant online forms.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'Can I apply for the National Creativity Award for work done as a government contractor?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'Applications for the National Creativity Award from non-government entities will be considered on a case-by-case basis.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
//
//   await prisma.question.create({
//     data: {
//       text: 'What is the status of my financial support scheme application?',
//       state: QuestionState.APPROVED,
//       writer: { connect: { id: citizena.id } },
//       uppedBy: {
//         create: [{ user: { connect: { id: citizend.id } } }],
//       },
//       downedBy: {
//         create: [{ user: { connect: { id: citizene.id } } }],
//       },
//       answers: {
//         create: {
//           text: 'To check for your application status, please visit the application portal.',
//           writer: {
//             connect: { id: officer.id },
//           },
//           poster: {
//             connect: { id: officer.id },
//           },
//           isOfficial: true,
//           uppedBy: {
//             create: [{ user: { connect: { id: citizenf.id } } }],
//           },
//           downedBy: {
//             create: [{ user: { connect: { id: citizeng.id } } }],
//           },
//         },
//       },
//     },
//   })
// }
//
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
