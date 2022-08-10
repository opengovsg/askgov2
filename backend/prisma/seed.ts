import { PrismaClient, ScreenState } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  //////////////////////////////////////////////////////////////
  // Users
  //////////////////////////////////////////////////////////////

  const citizena = await prisma.user.upsert({
    where: { openid: 'citizena' },
    update: {},
    create: {
      openid: 'citizena',
    },
  })

  const citizenb = await prisma.user.upsert({
    where: { openid: 'citizenb' },
    update: {},
    create: {
      openid: 'citizenb',
    },
  })

  const citizenc = await prisma.user.upsert({
    where: { openid: 'citizenc' },
    update: {},
    create: {
      openid: 'citizenc',
    },
  })

  const citizend = await prisma.user.upsert({
    where: { openid: 'citizend' },
    update: {},
    create: {
      openid: 'citizend',
    },
  })

  const citizene = await prisma.user.upsert({
    where: { openid: 'citizene' },
    update: {},
    create: {
      openid: 'citizene',
    },
  })

  const citizenf = await prisma.user.upsert({
    where: { openid: 'citizenf' },
    update: {},
    create: {
      openid: 'citizenf',
    },
  })

  const citizeng = await prisma.user.upsert({
    where: { openid: 'citizeng' },
    update: {},
    create: {
      openid: 'citizeng',
    },
  })

  //////////////////////////////////////////////////////////////
  // Questions
  //////////////////////////////////////////////////////////////

  await prisma.question.create({
    data: {
      body: 'New Question',
      screenState: ScreenState.NEW,
      author: { connect: { id: citizena.id } },
    },
  })

  await prisma.question.create({
    data: {
      body: 'Rejected Question',
      screenState: ScreenState.REJECTED,
      author: { connect: { id: citizena.id } },
    },
  })

  await prisma.question.create({
    data: {
      body: 'Aproved Question',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizena.id } },
    },
  })

  await prisma.question.create({
    data: {
      body: 'What financial support schemes are available at WAS?',
      screenState: ScreenState.NEW,
      author: { connect: { id: citizena.id } },
      answers: {
        create: {
          body: 'WAS offers a Jobseeker Allowance Scheme and a Small Business Worker Income Support Package to help with the optimal allocation of work in Singapore.',
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'How do I apply for a WAS scheme?',
      screenState: ScreenState.REJECTED,
      author: { connect: { id: citizena.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      answers: {
        create: {
          body: 'Applicants may go to our official website to submit their applications via the relevant online forms.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'How long does a WAS financial support scheme application take to process?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizena.id } },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'Applications typically take 2-3 weeks to process. In cases with complex circumstances, applications may take up to a month.',
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'How much is given out annually via WAS schemes?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizena.id } },
      uppedBy: {
        create: [
          { user: { connect: { id: citizend.id } } },
          { user: { connect: { id: citizene.id } } },
        ],
      },
      answers: {
        create: {
          body: 'WAS gives out about $120,000 annually through its financial support schemes. Most of it is through Jobseeker Allowances, with the rest providing Small Business Worker Income Support',
          uppedBy: {
            create: [
              { user: { connect: { id: citizenf.id } } },
              { user: { connect: { id: citizeng.id } } },
            ],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'My application for financial support was rejected. Can I apply again?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizena.id } },
      downedBy: {
        create: [
          { user: { connect: { id: citizend.id } } },
          { user: { connect: { id: citizene.id } } },
        ],
      },
      answers: {
        create: {
          body: 'Applicants are advised to allow for a period of about 3 months before making an application again.',
          downedBy: {
            create: [
              { user: { connect: { id: citizenf.id } } },
              { user: { connect: { id: citizeng.id } } },
            ],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'What other non-support financial programmes are run by WAS?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizena.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'WAS administers the National Creativity Award, which recognises innovations made in the course of government work.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'I am currently unemployed and need as much financial support as possible. Can I apply for both the WAS Jobseeker Allowance and an apprenticeship sponsored by WAS at the same time?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenb.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'We currently do not allow for applications for financial support and apprenticeship at the same time. This is to prevent overallocation of funds to individuals and to optimise allocation of work done in processing applications. We apologise for the inconvenience caused.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'Which industry sectors have WAS-sponsored apprenticeships available?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenb.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'WAS sponsors apprenticeships in sectors it identifies as in need of significant manpower. This currently includes:\n- Marine Engineering\n- Nursing and Allied Professions\n- Social Services',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'Why does WAS not provide apprenticeships across all of industry?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenb.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'The Singapore Government has tasked WAS with the mandate of optimum allocation of work. To this end, its programmes and initiatives focus on directing people to industry sectors where the need for manpower is keenest.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'How long can WAS-sponsored apprenticeships run for?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenb.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'WAS-sponsored apprenticeships should last no longer than 12 months. Beyond this period, the employer should consider converting the apprentice to a full-time employment.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'What is the minimum stipend that is given to the apprentice?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenb.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'The minimum stipend given to WAS-sponsored apprentices is means-tested annually and is $3000 as of 2021. 75% of this will be provided by WAS, with the remainder topped up by the employer.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'I am a representative of my industry sector and would like WAS to consider sponsoring apprenticeships in my sector. How should I make an appeal to WAS to do this?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenb.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'You may email WAS at industry.relations@was.gov.sg to make a case for your industry sector to be considered.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'How do I offer WAS-sponsored apprenticeships through my own company?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenc.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'Company owners or human resources officers employers who wish to offer apprenticeships may go to our official website to submit their applications via the relevant online forms.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'Can I offer more than the minimum stipend for WAS-sponsored apprenticeships?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenc.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'An employer may offer more than the minimum stipend, however, any additional salary costs shall be borne solely by the employer.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'What kind of support can WAS provide to understaffed companies?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenc.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'As part of its mission to optimise allocation of work in Singapore, WAS offers the following programmes to employers:\n- Apprenticeships\n- Robotics and Automation Subsidies',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'How do I apply for a subsidy for robotics and automation?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenc.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'Understaffed companies may go to our official website to submit their applications via the relevant online forms.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'Can I apply for the National Creativity Award for work done as a government contractor?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenc.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'Applications for the National Creativity Award from non-government entities will be considered on a case-by-case basis.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })

  await prisma.question.create({
    data: {
      body: 'What is the status of my financial support scheme application?',
      screenState: ScreenState.APPROVED,
      author: { connect: { id: citizenc.id } },
      uppedBy: {
        create: [{ user: { connect: { id: citizend.id } } }],
      },
      downedBy: {
        create: [{ user: { connect: { id: citizene.id } } }],
      },
      answers: {
        create: {
          body: 'To check for your application status, please visit the application portal.',
          uppedBy: {
            create: [{ user: { connect: { id: citizenf.id } } }],
          },
          downedBy: {
            create: [{ user: { connect: { id: citizeng.id } } }],
          },
        },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
