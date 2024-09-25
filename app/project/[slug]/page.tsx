import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Card, CardContent, CardHeader, Container, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { promises as fs } from 'fs';
import Image from 'next/image';
import CategoryLayer from "../../components/CategoryLayer/CategoryLayer";
import JBox from "../../components/JBox/JBox";
import JLink from '../../components/JLink/JLink';


type Params = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Params) {
    return { title: `Work Experience in ${params.slug}` };
}

export default async function Page({ params }: Params) {
    const file = (await fs.readFile(process.cwd() + `/app/data/project/${params.slug}.json`, 'utf8'));
    const data = JSON.parse(file);

    return (
        <Grid container justifyContent="center">
            <Grid size={{ xs: 12, md: 'auto' }} alignSelf="center" justifySelf="center" sx={{ textAlign: "center", position: 'relative', width: '100%' }}>
                <Container sx={{ textAlign: "center", position: 'relative' }}>
                    <Image
                        src={data.company.image.src}
                        alt={`${params.slug}-logo`}
                        width={data.company.image.width}
                        height={data.company.image.height}
                        style={{ objectFit: "contain" }}
                    />
                </Container>
            </Grid>
            <Grid size={{ xs: 12, md: 'grow' }}>
                <JBox needsDivider isSectionComponent>
                    <Typography variant="h4" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
                        {data.company.name}
                    </Typography>
                    <Typography variant="subtitle1" component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                        {`${data.role}`} • {`${data.timePeriod}`}
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems="center"
                        spacing={2}
                        textAlign="center"
                    >
                        <Typography variant="subtitle1" component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                            {`${data.role}`} • {`${data.timePeriod}`}
                        </Typography>
                        <Typography variant="subtitle2" textAlign="center">
                            <LocationOnOutlinedIcon /> {data.company.location}
                        </Typography>
                        <Typography variant="subtitle2">
                            <JLink href={data.company.homePage.href} newTab>
                                <HomeOutlinedIcon /> {data.company.homePage.text}
                            </JLink>
                        </Typography>
                        <Typography variant="subtitle2">
                            {
                                data.company.linkedIn
                                    ? (
                                        <JLink href={data.company.linkedIn.href} newTab>
                                            <LinkedInIcon /> {data.company.linkedIn.text}
                                        </JLink>
                                    ) : (
                                        <Tooltip title="Oops, no LinkedIn Connection here." placement="right-end">
                                            <IconButton>
                                                <LinkedInIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )
                            }
                        </Typography>
                        <Typography variant="subtitle2">
                            {
                                data.referenceInfo
                                    ? (
                                        <JLink href={data.referenceInfo.href} newTab>
                                            <ConnectWithoutContactOutlinedIcon /> {data.referenceInfo.text}
                                        </JLink>
                                    ) : (
                                        <Tooltip title="Reference no longer exists." placement="right-end">
                                            <IconButton>
                                                <ConnectWithoutContactOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )
                            }
                        </Typography>
                    </Stack>
                </JBox>
                <Container>
                    <Card sx={{ p: 1 }}>
                        <CardHeader
                            title={<Typography variant="h6">Technology Stack</Typography>}
                        />
                        <Divider />
                        <CardContent>
                            {
                                data.frontend && (
                                    <Typography variant="h6">
                                        FrontEnd: {' '}
                                        <CategoryLayer
                                            tightSpacing
                                            categories={data.frontend}
                                        />
                                    </Typography>
                                )
                            }
                            {
                                data.backend && (
                                    <Typography variant="h6">
                                        BackEnd: {' '}
                                        <CategoryLayer
                                            tightSpacing
                                            categories={data.backend}
                                        />
                                    </Typography>
                                )
                            }
                            {
                                data.database && (
                                    <Typography variant="h6">
                                        Database and related tools: {' '}
                                        <CategoryLayer
                                            tightSpacing
                                            categories={data.database}
                                        />
                                    </Typography>
                                )
                            }
                            {
                                data.cloud && (
                                    <Typography variant="h6">
                                        Cloud Infrastructure and CI/CD pipelines: {' '}
                                        <CategoryLayer
                                            tightSpacing
                                            categories={data.cloud}
                                        />
                                    </Typography>
                                )
                            }
                        </CardContent>
                    </Card>
                </Container>
            </Grid>
        </Grid>
    )
}
